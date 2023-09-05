import { Logger, Module, NestModule } from '@nestjs/common';
import { PersistService } from './persist.service';
import { QueueService } from './queue.service';

@Module({
  providers: [
    //
    QueueService,
    PersistService,
  ],
  exports: [
    //
    QueueService,
    PersistService,
  ],
})
export class AppProcessorModule implements NestModule {
  private readonly logger = new Logger(AppProcessorModule.name);

  configure() {
    this.logger.log('Configure');
  }
}
