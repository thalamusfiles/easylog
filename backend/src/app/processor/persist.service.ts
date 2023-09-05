import { Injectable, Logger, Scope } from '@nestjs/common';
import ChainSemaphore, { DoneFunction } from 'src/commons/chain.semaphore';

@Injectable({ scope: Scope.DEFAULT })
export class PersistService {
  private readonly logger = new Logger(PersistService.name);

  queue = new ChainSemaphore();
  running: boolean = false;

  constructor() {
    this.logger.log('Starting');
  }

  public flush(): void {
    if (this.running) return;

    this.queue.take((next) => {
      this.running = true;

      this.persistData(next);

      this.running = false;
    });
  }

  private persistData(next: DoneFunction): void {
    next();
  }
}
