# TypeScript Interfaces: Movie Review Website

**Feature**: Movie Review Website  
**Created**: October 27, 2025  
**Phase**: 1 - TypeScript Interface Definitions

## Core Data Interfaces

```typescript
// src/types/movie.ts

/**
 * Complete movie data structure for detail pages
 */
export interface Movie {
  /** URL-safe unique identifier (e.g., "the-matrix") */
  id: string;
  
  /** Full movie title */
  title: string;
  
  /** Movie synopsis/plot summary (50-500 characters) */
  description: string;
  
  /** Array of genre tags */
  genre: string[];
  
  /** Year of release (1900 - current year + 2) */
  releaseYear: number;
  
  /** Primary director name */
  director: string;
  
  /** Array of main cast member names (1-10 actors) */
  cast: string[];
  
  /** Content rating (e.g., "PG-13", "R") */
  rating: string;
  
  /** Path to poster image */
  posterUrl: string;
  
  /** Runtime in minutes */
  duration: number;
  
  /** IMDb rating (1.0 - 10.0) */
  imdbRating: number;
}

/**
 * Lightweight movie data for landing page grid
 */
export interface MovieSummary {
  /** URL-safe unique identifier */
  id: string;
  
  /** Movie title */
  title: string;
  
  /** Genre tags for filtering */
  genre: string[];
  
  /** Release year */
  releaseYear: number;
  
  /** Poster image path */
  posterUrl: string;
  
  /** IMDb rating for sorting/display */
  imdbRating: number;
}
```

## Component Interface Definitions

```typescript
// src/types/components.ts

import { Movie, MovieSummary } from './movie';

/**
 * Props for MovieCard component
 */
export interface MovieCardProps {
  /** Movie summary data to display */
  movie: MovieSummary;
  
  /** Click handler for navigation to detail page */
  onClick: (movieId: string) => void;
  
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Props for MovieGrid component
 */
export interface MovieGridProps {
  /** Array of movies to display in grid */
  movies: MovieSummary[];
  
  /** Click handler for movie selection */
  onMovieClick: (movieId: string) => void;
  
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Props for MovieDetails component
 */
export interface MovieDetailsProps {
  /** Complete movie data to display */
  movie: Movie;
  
  /** Handler for back navigation */
  onBackClick: () => void;
  
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Props for movie detail page
 */
export interface MovieDetailPageProps {
  params: {
    /** Movie ID from URL parameter */
    id: string;
  };
}
```

## Data Service Interfaces

```typescript
// src/types/services.ts

import { Movie, MovieSummary } from './movie';

/**
 * Movie data service interface
 */
export interface MovieService {
  /** Get all movies as summaries for landing page */
  getAllMovieSummaries(): MovieSummary[];
  
  /** Get complete movie data by ID */
  getMovieById(id: string): Movie | undefined;
  
  /** Get all movies (for static generation) */
  getAllMovies(): Movie[];
  
  /** Check if movie exists */
  movieExists(id: string): boolean;
}

/**
 * Static params for Next.js generateStaticParams
 */
export interface MovieStaticParams {
  id: string;
}
```

## UI State Interfaces

```typescript
// src/types/ui.ts

/**
 * Page loading states
 */
export interface PageState {
  /** Whether page is in loading state */
  loading: boolean;
  
  /** Error message if any */
  error?: string;
  
  /** Whether data is available */
  hasData: boolean;
}

/**
 * Navigation state
 */
export interface NavigationState {
  /** Current page identifier */
  currentPage: 'landing' | 'movie-detail';
  
  /** Previous page for back navigation */
  previousPage?: string;
  
  /** Current movie ID if on detail page */
  currentMovieId?: string;
}
```

## Utility Type Definitions

```typescript
// src/types/utils.ts

/**
 * Genre types for type safety
 */
export type MovieGenre = 
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'Romance'
  | 'Science Fiction'
  | 'Thriller'
  | 'War'
  | 'Western';

/**
 * Content rating types
 */
export type ContentRating = 
  | 'G'
  | 'PG'
  | 'PG-13'
  | 'R'
  | 'NC-17'
  | 'NR';

/**
 * Image size variants for responsive images
 */
export type ImageSize = 
  | 'thumbnail'  // 150x225
  | 'small'      // 300x450
  | 'medium'     // 500x750
  | 'large';     // 800x1200

/**
 * Responsive breakpoint types
 */
export type Breakpoint = 
  | 'mobile'     // < 768px
  | 'tablet'     // 768px - 1024px
  | 'desktop';   // > 1024px
```

## Next.js Specific Interfaces

```typescript
// src/types/nextjs.ts

import { Metadata } from 'next';

/**
 * Metadata generation function type
 */
export interface MetadataFunction {
  (params: { params: { id: string } }): Promise<Metadata>;
}

/**
 * Static params generation function type
 */
export interface StaticParamsFunction {
  (): Promise<{ id: string }[]>;
}

/**
 * Page component type for movie detail
 */
export interface MovieDetailPageComponent {
  (props: { params: { id: string } }): Promise<JSX.Element>;
}
```