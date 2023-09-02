import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PersistService {
  private readonly logger = new Logger(PersistService.name);

  constructor() {
    this.logger.log('Starting');
  }
}
