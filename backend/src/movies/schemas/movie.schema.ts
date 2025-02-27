import { Schema, Document } from 'mongoose';

export interface Movie extends Document {
  title: string;
  year: number;
  poster: string;
}

export const MovieSchema = new Schema<Movie>({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  poster: { type: String, required: true },  // The path to the uploaded poster
});
