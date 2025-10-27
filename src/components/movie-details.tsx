'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { Movie } from '@/types/movie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MovieBreadcrumb } from '@/components/breadcrumb';
import { getAllMovieSummaries } from '@/lib/movie-service';
import { MovieCard } from '@/components/movie-card';
import { ArrowLeft, Star, Clock, Calendar } from 'lucide-react';

interface MovieDetailsProps {
  movie: Movie;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const router = useRouter();

  const handleBackToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleMovieClick = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  // Keyboard navigation: ESC to go back
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleBackToHome();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleBackToHome]);

  // Get related movies (movies with similar genres, excluding current movie)
  const allMovies = getAllMovieSummaries();
  const relatedMovies = allMovies
    .filter(
      (m) =>
        m.id !== movie.id &&
        m.genre.some((genre) => movie.genre.includes(genre))
    )
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-8 sm:pt-12">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <MovieBreadcrumb movie={movie} />
      </div>

      {/* Back Navigation */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="flex items-center gap-2 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Movies
        </Button>
      </div>

      {/* Movie Details */}
      <article className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <aside className="lg:col-span-1" aria-label="Movie poster">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Movie Information */}
        <section
          className="lg:col-span-2 space-y-6"
          aria-labelledby="movie-title"
        >
          {/* Title and Basic Info */}
          <header>
            <h1
              id="movie-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1" aria-label="IMDb rating">
                <Star
                  className="h-5 w-5 text-yellow-500 fill-current"
                  aria-hidden="true"
                />
                <span className="text-lg font-semibold">
                  {movie.imdbRating.toFixed(1)}/10
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  IMDb Rating
                </span>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={movie.releaseYear.toString()}>
                  {movie.releaseYear}
                </time>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{movie.duration} min</span>
              </div>
            </div>

            {/* Genres */}
            <div
              className="flex flex-wrap gap-2 mb-6"
              role="list"
              aria-label="Movie genres"
            >
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="secondary" role="listitem">
                  {genre}
                </Badge>
              ))}
            </div>
          </header>

          {/* Plot */}
          <Card>
            <CardHeader>
              <CardTitle>Plot</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {movie.description}
              </p>
            </CardContent>
          </Card>

          {/* Cast and Crew */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Director */}
            <Card>
              <CardHeader>
                <CardTitle>Director</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{movie.director}</p>
              </CardContent>
            </Card>

            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{movie.rating}</p>
              </CardContent>
            </Card>
          </div>

          {/* Cast */}
          <Card>
            <CardHeader>
              <CardTitle>Cast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {movie.cast.map((actor, index) => (
                  <div
                    key={`${actor}-${index}`}
                    className="flex items-center p-2 rounded-md bg-secondary/50"
                  >
                    <span className="font-medium">{actor}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Release Year</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{movie.releaseYear}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{movie.duration} minutes</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </article>

      {/* Related Movies Section */}
      {relatedMovies.length > 0 && (
        <section className="mt-12" aria-labelledby="related-movies">
          <div className="border-t pt-8">
            <header className="flex items-center justify-between mb-6">
              <h2 id="related-movies" className="text-2xl font-semibold">
                Related Movies
              </h2>
              <Button variant="outline" asChild>
                <Link href="/" aria-label="View all movies">
                  View All Movies
                </Link>
              </Button>
            </header>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              role="list"
              aria-label="Related movies"
            >
              {relatedMovies.map((relatedMovie) => (
                <div key={relatedMovie.id} role="listitem">
                  <MovieCard
                    movie={relatedMovie}
                    onClick={handleMovieClick}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
