import { Injectable, Logger, Scope } from '@nestjs/common';
import logConfig from 'src/config/log.config';
import { Reader } from './io/reader';
import * as fs from 'fs';
import * as path from 'path';
import * as events from 'events';
import LogRawData from 'src/commons/type/lograwdata';
import { FilterQuery } from 'src/commons/type/whereoperator';
import { isEmpty } from 'lodash';
import { testJsonWhere } from 'src/commons/testjsonwhere';

type ReadFileCallback = (string) => void;
type SearchOptions = { page?: number; perPage?: number };

@Injectable({ scope: Scope.DEFAULT })
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor() {
    this.logger.log('Starting');
  }

  async getIndiceFolders(): Promise<Array<string>> {
    let files = fs.readdirSync(logConfig.FOLDER_PATH, { withFileTypes: false, recursive: true }) as string[];

    return files.filter((fileOrDir) => fs.statSync(`${logConfig.FOLDER_PATH}${path.sep}${fileOrDir}`).isDirectory());
  }

  async seach(index: string, where: FilterQuery<LogRawData>, options?: SearchOptions): Promise<Array<any>> {
    const list: Array<any> = [];

    const dirname = this.resolveDirname(index);
    const reader = this.createReader(dirname);
    const files = reader.listFiles();

    let lineIdx = 0;
    const startLine = (options.page - 1) * options.perPage;
    const endLine = startLine + options.perPage;

    // Carrega os arquivos
    for (const rl of this.readFileByFile(reader, files)) {
      // Percorre cada linha do arquivo
      for await (const line of rl) {
        try {
          const json = JSON.parse(line);
          // Verifica se atende as condições dos filtros
          if (this.testWhere(json, where)) {
            // Se possui paginação
            if (options.perPage) {
              // Verifica se já encontrou a quantidade de registros informados
              if (startLine <= lineIdx && lineIdx < endLine) {
                list.push(json);
              } // Se superou a quantidade por página interrompe a busca
              else if (lineIdx >= endLine) {
                break;
              }
              lineIdx++;
            } // Se não existe paginação, adiciona
            else {
              list.push(json);
            }
          }
        } catch (ex) {
          this.logger.warn(`JSON corrupted in index ${index}: ${line}`);
        }
      }
    }

    return list;
  }

  *readFileByFile(reader: Reader, files: Array<string>) {
    for (const file of files) {
      const rl = reader.createReadStream(file);

      yield rl;
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
