import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads/posters',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createMovie(
    @Body() body: { title: string; year: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const movie = await this.moviesService.createMovie(
      body.title,
      body.year,
      file.filename,
    );
    return { message: 'Movie created successfully', movie };
  }

  @Get()
  async getAllMovies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const { movies, totalMovies } = await this.moviesService.getMovies(
      page,
      limit,
    );
    return { message: 'Movies fetched sucessfully', movies, totalMovies };
  }

  @Get(':movieId')
  async getMovieById(@Param('movieId') movieId: string) {
    const movie = await this.moviesService.getMovieById(movieId);
    if (!movie) {
      return { message: 'Movie not found' };
    }
    return { message: 'Movie fetched successfully', movie };
  }

  @Put(':movieId')
  @UseInterceptors(FileInterceptor('poster'))
  async updateMovie(
    @Param('movieId') movieId: string,
    @Body() body: { title: string; year: number; poster?: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(movieId, "body", body);
    if(file) {
      body.poster = file.filename;
    }
    const updatedMovie = await this.moviesService.updateMovie(movieId, body);
    console.log(updatedMovie);
    return { message: 'Movie updated successfully', movie: updatedMovie };
  }
}
