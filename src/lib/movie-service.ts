import { movies } from '@/data/movies';
import { Movie, MovieSummary } from '@/types/movie';

export function getAllMovieSummaries(): MovieSummary[] {
  return movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    genre: movie.genre,
    releaseYear: movie.releaseYear,
    posterUrl: movie.posterUrl,
    imdbRating: movie.imdbRating,
  }));
}

export function getMovieById(id: string): Movie | undefined {
  return movies.find((movie) => movie.id === id);
}

export function getAllMovieIds(): string[] {
  return movies.map((movie) => movie.id);
}

export function movieExists(id: string): boolean {
  return movies.some((movie) => movie.id === id);
}
