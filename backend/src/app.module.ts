import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/movieDB'),
    MoviesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", 'uploads'),
      serveRoot: '/uploads/',
    })
  ],
})
export class AppModule {}
