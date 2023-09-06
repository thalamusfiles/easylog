import { Injectable, Logger, Scope } from '@nestjs/common';
import ChainSemaphore, { DoneFunction } from 'src/commons/chain.semaphore';
import logConfig from 'src/config/log.config';
import * as fs from 'fs';
import * as path from 'path';

type FSStateCallback = (err: NodeJS.ErrnoException | null, size?: number) => void;

@Injectable({ scope: Scope.DEFAULT })
export class PersistService {
  private readonly logger = new Logger(PersistService.name);

  nodeId: string;
  lazy: boolean;

  wStream: fs.WriteStream;
  currentPath: string;
  currentSize: number;
  maxsize: number;

  dirname: string;
  rawFolder: string;
  filename: string;
  opening: boolean;

  queue = new ChainSemaphore();
  running: boolean = false;

  constructor() {
    this.logger.log('Starting');

    this.init();
  }

  init() {
    this.nodeId = logConfig.NODE_ID;
    this.lazy = logConfig.LAZY;
    this.maxsize = logConfig.MAX_FILE_SIZE;
    this.rawFolder = 'raw';

    if (!this.nodeId) {
      this.logger.warn('Node ID is required to cluster.');
    }

    this.logger.log('Checking if a folder exists.');
    if (logConfig.FOLDER_PATH) {
      this.dirname = path.normalize(logConfig.FOLDER_PATH);

      if (!path.isAbsolute(this.dirname)) {
        this.logger.warn('Absolute path is recommended.');
      }

      this.createLogDirIfNotExist(this.dirname);
    } else {
      this.logger.warn('Unspecified folder.');
    }
  }

  flush(): void {
    if (this.running) return;

    this.queue.take((next) => {
      this.running = true;

      this.persistData(next);

      this.running = false;
    });
  }

  private persistData(next: DoneFunction): void {
    this.open('index');
    if (this.wStream) {
      this.wStream.write('teste');
    }

    next();
  }

  private createLogDirIfNotExist(dirPath) {
    if (!fs.existsSync(dirPath)) {
      this.logger.warn('Folder not exists, creating.');
      fs.mkdirSync(dirPath, { recursive: true });
      this.logger.log('Folder created.');
    } else {
      this.logger.log('Folder alright exists.');
    }
  }

  /**
   * Checks to see the filesize of.
   * @returns {undefined}
   */
  open(index: string) {
    // If we do not have a filename then we were passed a stream and
    // don't need to keep track of size.
    if (!this.filename) return;
    if (this.opening) return;

    this.opening = true;

    // Stat the target file to get the size and create the stream.
    this.stat(index, (err: NodeJS.ErrnoException | null, size?: number) => {
      if (err) {
        return;
      }
      this.currentSize = size;
      this.wStream = this.createStream(this.currentPath);
      this.opening = false;
    });
  }

  /**
   * Stat the file and assess information in order to create the proper stream.
   * @param {function} callback - TODO: add param description.
   * @returns {undefined}
   */
  stat(index: string, callback: FSStateCallback) {
    fs.stat(this.currentPath, (err, stat) => {
      if (err && err.code === 'ENOENT') {
        return callback(null, 0);
      }

      if (err) {
        return callback(err);
      }

      if (!stat || this.fileSizeExceeded(stat.size)) {
        return this.changeCurrentFile(index, () => this.stat(index, callback));
      }

      callback(null, stat.size);
    });
  }

  /**
   * Verifica se o tamanho informado excedeu o limite
   */
  private fileSizeExceeded(size) {
    size = size || this.currentSize;
    return this.maxsize && size >= this.maxsize;
  }

  /**
   * Altera o nome do arquivo para o próximo da fila.
   */
  private changeCurrentFile(index: string, callback: () => void) {
    this.currentPath = this.nextFileName(index);

    callback();
  }

  /**
   * Criar o nome do próximo arquivo de log
   * @returns {string} - TODO: add return description.
   * @private
   */
  private nextFileName(index: string) {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');

    const filename = `${year}${month}${day}_${hh}${mm}_${this.nodeId}`;

    return `${this.dirname}/${index}/${this.rawFolder}/${filename}`;
  }

  private createStream(fullpath: string): fs.WriteStream {
    return (
      fs
        .createWriteStream(fullpath, { flags: 'a' })
        // TODO: What should we do with errors here?
        .on('error', (err) => this.logger.error(err))
        .on('close', () => this.logger.debug(`close file ${fullpath}`))
        .on('open', () => {})
    );
  }
}
