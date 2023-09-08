import { Injectable, Logger, Scope } from '@nestjs/common';
import logConfig from 'src/config/log.config';
import { Reader } from './io/reader';
import * as events from 'events';
import LogRawData from 'src/commons/type/lograwdata';
import { FilterQuery } from 'src/commons/type/whereoperator';
import { isEmpty } from 'lodash';
import { testJsonWhere } from 'src/commons/testjsonwhere';

type ReadFileCallback = (string) => void;

@Injectable({ scope: Scope.DEFAULT })
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor() {
    this.logger.log('Starting');
  }

  async seach(index: string, where: FilterQuery<LogRawData>): Promise<Array<any>> {
    const list: Array<any> = [];

    const dirname = this.resolveDirname(index);
    const reader = this.createReader(dirname);
    const files = reader.listFiles();

    await this.readFileByFile(reader, files, (line: string) => {
      try {
        const json = JSON.parse(line);
        if (this.testWhere(json, where)) {
          list.push(json);
        }
      } catch (ex) {
        this.logger.warn(`JSON corrupted in index ${index}: ${line}`);
      }
    });

    return list;
  }

  async readFileByFile(reader: Reader, files: Array<string>, callback: ReadFileCallback): Promise<void> {
    for (const file of files) {
      const rl = reader.createReadStream(file);

      rl.on('line', callback);

      await events.once(rl, 'close');
    }
  }

  testWhere(line: LogRawData, where: FilterQuery<LogRawData>) {
    if (isEmpty(line)) return false;
    if (isEmpty(where)) return true;

    return testJsonWhere(line, where);
  }

  createReader(dirname: string): Reader {
    return new Reader({ dirname });
  }

  private resolveDirname(index: string) {
    return `${logConfig.FOLDER_PATH}/${index}/raw`;
  }
}
