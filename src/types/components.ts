import { Movie, MovieSummary } from './movie';

export interface MovieCardProps {
  movie: MovieSummary;
  onClick: (movieId: string) => void;
  className?: string;
}

export interface MovieGridProps {
  movies: MovieSummary[];
  onMovieClick: (movieId: string) => void;
  className?: string;
}

export interface MovieDetailsProps {
  movie: Movie;
  onBackClick: () => void;
  className?: string;
}

export interface MovieDetailPageProps {
  params: {
    id: string;
  };
}
