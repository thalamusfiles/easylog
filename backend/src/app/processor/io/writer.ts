import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

type WriterProps = {
  nodeId: string;
  lazy: boolean;
  maxsize: number;

  dirname: string;
};

export class Writer {
  private readonly logger = new Logger(Writer.name);

  nodeId: string;
  lazy: boolean;

  wStream: fs.WriteStream;
  currentPath: string;
  currentSize: number;
  maxsize: number;

  dirname: string;
  opening: boolean;

  constructor(options: WriterProps) {
    this.logger.log('Starting');

    this.nodeId = options.nodeId;
    this.lazy = options.lazy;
    this.maxsize = options.maxsize;
    this.dirname = options.dirname;

    if (!this.nodeId) {
      this.logger.warn('Node ID is required to cluster.');
    }

    this.normalizeAndCreateDirPath();
    this.findLastLogFile();
    if (!this.currentPath) {
      this.changeCurrentFile();
    }
  }

  write(data: any): void {
    if (!this.wStream) {
      this.open();
    } else if (this.fileSizeExceeded(this.currentSize)) {
      this.changeCurrentFile();
      this.open();
    }

    if (this.wStream) {
      this.wStream.write(data);
      this.currentSize += data.length;
    } else {
      this.logger.warn('No stream started.');
    }
  }

  private normalizeAndCreateDirPath() {
    this.logger.log('Checking if a folder exists.');
    if (this.dirname) {
      if (!path.isAbsolute(this.dirname)) {
        this.logger.warn('Absolute path is recommended.');
      }

      this.dirname = path.resolve(path.normalize(this.dirname));

      this.createLogDirIfNotExist(this.dirname);
    } else {
      this.logger.warn('Unspecified folder.');
    }
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
   *
   */
  private findLastLogFile() {
    const files = fs //
      .readdirSync(this.dirname)
      .sort()
      .map((fileOrDir) => this.dirname + path.sep + fileOrDir)
      .filter(
        (fileOrDir) =>
          !fs.statSync(fileOrDir).isDirectory() && //
          fileOrDir.endsWith(`_${this.nodeId}`),
      );

    if (files.length) {
      this.currentPath = files[files.length - 1];
    }
  }

  /**
   * Abre or arquivo para gravação
   * @returns {undefined}
   */
  private open() {
    if (this.opening) return;

    this.opening = true;

    const sizeOrErr = this.stat();
    if (typeof sizeOrErr === 'object') {
      return;
    }

    this.currentSize = sizeOrErr;
    this.wStream = this.createStream(this.currentPath);
    this.opening = false;
  }

  /**
   * Coleta o tamanho do arquivo e se for necessário cria um novo
   * @param {function} callback - TODO: add param description.
   * @returns {undefined}
   */
  private stat() {
    try {
      const stat = fs.statSync(this.currentPath);

      if (!stat) {
        this.changeCurrentFile();
        return this.stat();
      }

      return stat.size;
    } catch (err) {
      if (err.code === 'ENOENT') {
        return 0;
      }
      return err;
    }
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
  private changeCurrentFile() {
    this.currentPath = this.nextFileName();
  }

  /**
   * Criar o nome do próximo arquivo de log
   * @returns {string} - TODO: add return description.
   * @private
   */
  private nextFileName() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');

    const filename = `${year}${month}${day}_${hh}${mm}_${this.nodeId}`;

    return `${this.dirname}/${filename}`;
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
