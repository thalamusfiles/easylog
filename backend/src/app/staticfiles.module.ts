import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import easyLogConfig from '../config/easylog.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend'),
      serveStaticOptions: {
        maxAge: easyLogConfig.STATIC_FILE_MAX_AGE,
      },
    }),
  ],
})
export class StaticFileModule {}
