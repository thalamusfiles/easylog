import { Logger, Module, NestModule } from '@nestjs/common';
import { PostController } from './controller/post.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [
    //
    PostController,
  ],
})
export class AppLogModule implements NestModule {
  private readonly logger = new Logger(AppLogModule.name);

  configure() {
    this.logger.log('Configure');
  }
}
