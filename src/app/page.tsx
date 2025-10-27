'use client';

import { getAllMovieSummaries } from '@/lib/movie-service';
import { MovieGrid } from '@/components/movie-grid';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const movies = getAllMovieSummaries();

  const handleMovieClick = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Movie Review Website
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover and explore our curated collection of movies. Click on any
          movie to see detailed information, cast, and more.
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">
            All Movies ({movies.length})
          </h2>
          <div className="text-sm text-muted-foreground">
            Sorted by IMDb Rating
          </div>
        </div>

        <MovieGrid
          movies={movies.sort((a, b) => b.imdbRating - a.imdbRating)}
          onMovieClick={handleMovieClick}
        />
      </section>
    </div>
  );
}
