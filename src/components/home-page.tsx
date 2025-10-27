'use client';

import { MovieGrid } from '@/components/movie-grid';
import { MovieSummary } from '@/types/movie';
import { useRouter } from 'next/navigation';

interface HomePageProps {
  movies: MovieSummary[];
}

export function HomePage({ movies }: HomePageProps) {
  const router = useRouter();

  const handleMovieClick = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-8 sm:pt-12">
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4">
          Movie Review Website
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          Discover and explore our curated collection of movies. Click on any
          movie to see detailed information, cast, and more.
        </p>
      </header>

      <section aria-labelledby="movies-heading">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-2 sm:gap-4">
          <h2 id="movies-heading" className="text-xl sm:text-2xl font-semibold">
            All Movies ({movies.length})
          </h2>
          <div
            className="text-xs sm:text-sm text-muted-foreground"
            aria-label="Sort information"
          >
            Sorted by IMDb Rating
          </div>
        </header>

        <MovieGrid
          movies={movies.sort((a, b) => b.imdbRating - a.imdbRating)}
          onMovieClick={handleMovieClick}
        />
      </section>
    </div>
  );
}
