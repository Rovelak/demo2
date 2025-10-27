export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  releaseYear: number;
  director: string;
  cast: string[];
  rating: string;
  posterUrl: string;
  duration: number;
  imdbRating: number;
}

export interface MovieSummary {
  id: string;
  title: string;
  genre: string[];
  releaseYear: number;
  posterUrl: string;
  imdbRating: number;
}
