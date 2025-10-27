'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MovieSummary } from '@/types/movie';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: MovieSummary;
  onClick: (movieId: string) => void;
  className?: string;
}

export function MovieCard({ movie, onClick, className }: MovieCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden',
        className
      )}
      onClick={() => onClick(movie.id)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {movie.releaseYear}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
            {movie.genre.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{movie.genre.length - 2}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">
              {movie.imdbRating.toFixed(1)}/10
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
