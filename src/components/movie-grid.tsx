'use client';

import { MovieSummary } from '@/types/movie';
import { MovieCard } from './movie-card';
import { cn } from '@/lib/utils';

interface MovieGridProps {
  movies: MovieSummary[];
  onMovieClick: (movieId: string) => void;
  className?: string;
}

export function MovieGrid({ movies, onMovieClick, className }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-8 sm:py-12 px-4"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-2 text-center">
          No movies available
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md px-2">
          We&apos;re working on adding more movies to our collection. Please
          check back later!
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6',
        className
      )}
      role="list"
      aria-label={`Collection of ${movies.length} movies`}
    >
      {movies.map((movie) => (
        <div key={movie.id} role="listitem">
          <MovieCard movie={movie} onClick={onMovieClick} className="w-full" />
        </div>
      ))}
    </div>
  );
}
