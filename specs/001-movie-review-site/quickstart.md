# Quick Start Guide: Movie Review Website

**Feature**: Movie Review Website  
**Created**: October 27, 2025  
**Tech Stack**: Next.js 13+, TypeScript, Tailwind CSS, shadcn/ui

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Basic knowledge of React and TypeScript

## Initial Setup

### 1. Create Next.js Project

```bash
npx create-next-app@latest movie-review-site --typescript --tailwind --eslint --app
cd movie-review-site
```

### 2. Install shadcn/ui

```bash
npx shadcn-ui@latest init
```

Configure shadcn/ui when prompted:

- Would you like to use TypeScript? **Yes**
- Which style would you like to use? **Default**
- Which color would you like to use as base color? **Slate**
- Where is your global CSS file? **src/app/globals.css**
- Would you like to use CSS variables for colors? **Yes**
- Where is your tailwind.config.js located? **tailwind.config.js**
- Configure the import alias for components? **src/components**
- Configure the import alias for utils? **src/lib/utils**

### 3. Install Required shadcn/ui Components

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
```

## Project Structure Setup

### 1. Create Directory Structure

```bash
mkdir -p src/components/ui
mkdir -p src/data
mkdir -p src/types
mkdir -p src/lib
mkdir -p public/images/posters
```

### 2. Set Up TypeScript Interfaces

Create `src/types/movie.ts`:

```typescript
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
```

### 3. Create Sample Movie Data

Create `src/data/movies.ts`:

```typescript
import { Movie } from "@/types/movie";

export const movies: Movie[] = [
  {
    id: "the-matrix",
    title: "The Matrix",
    description:
      "A computer programmer discovers that reality as he knows it is actually a simulated world, and he must join a rebellion to free humanity from the machines.",
    genre: ["Action", "Sci-Fi"],
    releaseYear: 1999,
    director: "The Wachowskis",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    rating: "R",
    posterUrl: "/images/posters/the-matrix.jpg",
    duration: 136,
    imdbRating: 8.7,
  },
  // Add more movies here...
];
```

### 4. Create Data Service

Create `src/lib/movie-service.ts`:

```typescript
import { movies } from "@/data/movies";
import { Movie, MovieSummary } from "@/types/movie";

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
```

## Component Implementation

### 1. MovieCard Component

Create `src/components/movie-card.tsx`:

```typescript
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MovieSummary } from "@/types/movie";
import Image from "next/image";

interface MovieCardProps {
  movie: MovieSummary;
  onClick: (movieId: string) => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(movie.id)}
    >
      <CardContent className="p-4">
        <div className="relative aspect-[2/3] mb-4">
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{movie.releaseYear}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {movie.genre.map((g) => (
            <Badge key={g} variant="secondary" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
        <p className="text-sm font-medium">★ {movie.imdbRating}/10</p>
      </CardContent>
    </Card>
  );
}
```

### 2. Landing Page

Update `src/app/page.tsx`:

```typescript
"use client";

import { getAllMovieSummaries } from "@/lib/movie-service";
import { MovieCard } from "@/components/movie-card";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const movies = getAllMovieSummaries();

  const handleMovieClick = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Movie Review Website
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
        ))}
      </div>
    </main>
  );
}
```

### 3. Movie Detail Page

Create `src/app/movie/[id]/page.tsx`:

```typescript
import { getMovieById, getAllMovieIds } from "@/lib/movie-service";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MovieDetailPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return getAllMovieIds().map((id) => ({ id }));
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movie = getMovieById(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          ← Back to Movies
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="relative aspect-[2/3]">
            <Image
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-xl text-gray-600 mb-4">
            {movie.releaseYear} • {movie.rating} • {movie.duration} min
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          <p className="text-lg mb-6">{movie.description}</p>

          <div className="space-y-4">
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Cast:</strong> {movie.cast.join(", ")}
            </p>
            <p>
              <strong>IMDb Rating:</strong> ★ {movie.imdbRating}/10
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
```

## Development Commands

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Run Tests

```bash
npm test
```

## Adding Movie Posters

1. Add poster images to `public/images/posters/`
2. Use descriptive filenames (e.g., `the-matrix.jpg`)
3. Recommended size: 300x450px (2:3 aspect ratio)
4. Supported formats: JPG, PNG, WebP

## Next Steps

1. Add more movies to `src/data/movies.ts`
2. Implement search and filtering functionality
3. Add loading states and error handling
4. Implement responsive design improvements
5. Add movie reviews and ratings
6. Deploy to Vercel or similar platform

## Troubleshooting

### Images Not Loading

- Ensure poster images are in `public/images/posters/`
- Check file paths in movie data match actual files
- Verify image file formats are supported

### TypeScript Errors

- Run `npm run type-check` to validate TypeScript
- Ensure all interfaces are properly imported
- Check for missing type definitions

### Styling Issues

- Verify Tailwind CSS is properly configured
- Check shadcn/ui components are installed
- Ensure CSS classes are correctly applied
