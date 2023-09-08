import { Logger, Module, NestModule } from '@nestjs/common';
import { PersistController } from './controller/persist.controller';
import { AppProcessorModule } from '../processor/processor.module';
import { SearchController } from './controller/search.controller';

@Module({
  imports: [AppProcessorModule],
  controllers: [
    //
    PersistController,
    SearchController,
  ],
})
export class AppLogModule implements NestModule {
  private readonly logger = new Logger(AppLogModule.name);

  configure() {
    this.logger.log('Configure');
  }
}
