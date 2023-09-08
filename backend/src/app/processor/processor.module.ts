import { Logger, Module, NestModule } from '@nestjs/common';
import { PersistService } from './persist.service';
import { QueueService } from './queue.service';
import { SearchService } from './search.service';

@Module({
  providers: [
    //
    QueueService,
    PersistService,
    SearchService,
  ],
  exports: [
    //
    QueueService,
    PersistService,
    SearchService,
  ],
})
export class AppProcessorModule implements NestModule {
  private readonly logger = new Logger(AppProcessorModule.name);

  configure() {
    this.logger.log('Configure');
  }
}
