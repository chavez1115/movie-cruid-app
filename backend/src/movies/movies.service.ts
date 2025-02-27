import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(@InjectModel('Movie') private movieModel: Model<Movie>) {}

  async createMovie(
    title: string,
    year: number,
    poster: string,
  ): Promise<Movie> {
    const movie = new this.movieModel({ title, year, poster });
    return movie.save();
  }

  async getMovies(page: number, limit: number): Promise<{ movies: Movie[], totalMovies: number }> {
    const skip = (page - 1) * limit;
    const movies = await this.movieModel.find().skip(skip).limit(limit).exec();
    const totalMovies = await this.movieModel.countDocuments();
    return { movies, totalMovies };
  }

  async getMovieById(movieId: string): Promise<Movie | null> {
    const movie = await this.movieModel.findById(movieId).exec();
    return movie;
  }

  async updateMovie(movieId: string, updateData: { title: string; year: number; poster?: string }): Promise<Movie | null> {
    console.log('service', updateData);
    const updatedMovie = await this.movieModel
      .findByIdAndUpdate({_id: movieId}, updateData, { new: true })
      .exec();

    return updatedMovie;
  }
}
