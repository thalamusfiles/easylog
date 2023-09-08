import { Injectable, Logger, Scope } from '@nestjs/common';
import logConfig from 'src/config/log.config';
import { Reader } from './io/reader';
import * as events from 'events';

@Injectable({ scope: Scope.DEFAULT })
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor() {
    this.logger.log('Starting');
  }

  seach(index: string, where: Record<string, any>): Array<any> {
    const dirname = this.resolveDirname(index);

    const reader = this.createReader(dirname);
    const files = reader.listFiles();

    this.readFileByFile(reader, files);

    return files;
  }

  async readFileByFile(reader: Reader, files: Array<string>): Promise<void> {
    for (const file of files) {
      const rl = reader.createReadStream(file);

      rl.on('line', (line) => {
        console.log(`Line from file: ${line}`);
      });

      await events.once(rl, 'close');
    }
  }

  createReader(dirname: string): Reader {
    return new Reader({ dirname });
  }

  private resolveDirname(index: string) {
    return `${logConfig.FOLDER_PATH}/${index}/raw`;
  }
}
