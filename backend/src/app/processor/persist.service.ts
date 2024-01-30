import { Injectable, Logger, Scope } from '@nestjs/common';
import ChainSemaphore, { DoneFunction } from 'src/commons/chain.semaphore';
import logConfig from 'src/config/log.config';
import { Writer } from './io/writer';
import { QueueService } from './queue.service';

@Injectable({ scope: Scope.DEFAULT })
export class PersistService {
  private readonly logger = new Logger(PersistService.name);

  private readonly queue = new ChainSemaphore();
  private readonly writers: Record<string, Writer> = {};
  private running: boolean = false;

  constructor(private readonly queueService: QueueService) {
    this.logger.log('Starting');
  }

  flush(): void {
    if (this.running) return;

    this.queue.take((next) => {
      this.running = true;

      this.persistData(next);

      this.running = false;
    });
  }

  formatIndex(index: string): string {
    return index.replace(/[^a-z0-9]/gi, '_');
  }

  private persistData(next: DoneFunction): void {
    let data;
    do {
      data = this.queueService.dequeuePersistData();
      if (data) {
        const index = data.index;
        this.initWriter(index);

        const writer = this.writers[index];
        writer.write('\n');

        if (typeof data === 'object') {
          writer.write(JSON.stringify(data));
        } else {
          writer.write(data);
        }
      }
    } while (data);

    next();
  }

  private initWriter(index: string) {
    if (!this.writers[index]) {
      const dirname = this.resolveDirname(index);

      this.writers[index] = new Writer({
        nodeId: logConfig.NODE_ID,
        lazy: logConfig.LAZY,
        maxsize: logConfig.MAX_FILE_SIZE,
        dirname,
      });
    }
  }

  private resolveDirname(index: string) {
    return `${logConfig.FOLDER_PATH}/${index}/raw`;
  }
}
