import { Module } from '@nestjs/common';
import { StaticFileModule } from './staticfiles.module';
import { AppLogModule } from './log/log.module';
import { AppProcessorModule } from './processor/processor.module';

@Module({
  imports: [
    //
    AppProcessorModule,
    AppLogModule,
    StaticFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
