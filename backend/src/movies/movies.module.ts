import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),  // Register the movie schema
    MulterModule.register({
      dest: './uploads/posters',  // Store uploaded posters in this folder
    }),
  ],
  controllers: [MoviesController],   // Register controller that handles requests
  providers: [MoviesService],        // Register service that handles business logic
})
export class MoviesModule {}
