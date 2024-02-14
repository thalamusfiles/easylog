import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

type ReaderProps = {
  dirname: string;
  filename?: string;
};

interface Reader {
  init(options: ReaderProps);
  listFiles(): Array<string>;
  createReadStream(filename: string): readline.Interface;
}

export class ReaderIdxByDate implements Reader {
  private readonly logger = new Logger(Reader.name);

  dirname: string;
  filename?: string;

  init(options: ReaderProps) {
    this.logger.log('Starting');

    this.dirname = options.dirname;
    this.filename = options.filename;

    this.normalizeDirPath();
  }

  listFiles(): Array<string> {
    try {
      const files = fs.readdirSync(this.dirname, { withFileTypes: false, recursive: true }) as string[];

      return files.filter((fileOrDir) => !fs.statSync(`${this.dirname}${path.sep}${fileOrDir}`).isDirectory());
    } catch (ex) {
      if (ex?.code !== 'ENOENT') {
        this.logger.error(ex);
      }
    }
    return [];
  }

  createReadStream(filename: string): readline.Interface {
    const rl = readline.createInterface({
      input: fs.createReadStream(`${this.dirname}${path.sep}${filename}`),
      crlfDelay: Infinity,
    });
    return rl;
  }

  private normalizeDirPath() {
    if (this.dirname) {
      this.dirname = path.resolve(path.normalize(this.dirname));
    }
  }
}

const Reader = ReaderIdxByDate;

export { Reader };
