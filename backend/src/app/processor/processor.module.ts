import { Logger, Module, NestModule } from '@nestjs/common';
import { PersistService } from './persist.service';

@Module({
  imports: [],
  providers: [
    //
    PersistService,
  ],
  controllers: [],
})
export class AppProcessorModule implements NestModule {
  private readonly logger = new Logger(AppProcessorModule.name);

  configure() {
    this.logger.log('Configure');
  }
}
