# Data Model: Movie Review Website

**Feature**: Movie Review Website  
**Created**: October 27, 2025  
**Phase**: 1 - Data Model Design

## Core Entities

### Movie

The primary entity representing a film with all necessary information for display.

**Fields**:

- `id`: string - Unique identifier for URL routing (e.g., "the-matrix")
- `title`: string - Full movie title (e.g., "The Matrix")
- `description`: string - Movie synopsis/plot summary
- `genre`: string[] - Array of genre tags (e.g., ["Action", "Sci-Fi"])
- `releaseYear`: number - Year of release (e.g., 1999)
- `director`: string - Primary director name
- `cast`: string[] - Array of main cast member names
- `rating`: string - Content rating (e.g., "PG-13", "R")
- `posterUrl`: string - Path to poster image (e.g., "/images/posters/the-matrix.jpg")
- `duration`: number - Runtime in minutes
- `imdbRating`: number - Rating score (1-10 scale)

**Validation Rules**:

- `id` must be URL-safe (lowercase, hyphens, no spaces)
- `title` is required and non-empty
- `description` should be 50-500 characters for optimal display
- `genre` must contain at least one genre
- `releaseYear` must be between 1900 and current year + 2
- `cast` should contain 1-10 actors for display purposes
- `posterUrl` must be valid image path
- `duration` must be positive integer
- `imdbRating` must be between 1.0 and 10.0

**TypeScript Interface**:

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
```

### Movie Summary

Lightweight version of Movie for landing page display to optimize performance.

**Fields**:

- `id`: string - Same as Movie.id for navigation
- `title`: string - Movie title
- `genre`: string[] - Genre tags for filtering
- `releaseYear`: number - Release year
- `posterUrl`: string - Poster image path
- `imdbRating`: number - Rating for sorting/display

**TypeScript Interface**:

```typescript
export interface MovieSummary {
  id: string;
  title: string;
  genre: string[];
  releaseYear: number;
  posterUrl: string;
  imdbRating: number;
}
```

## Data Relationships

### Static Data Structure

Since this is a static site with embedded data, relationships are handled through data organization rather than database relations.

**Movie Collection**:

- Array of Movie objects stored in `/src/data/movies.ts`
- Indexed by `id` for efficient lookups
- Sorted by default criteria (e.g., imdbRating descending)

**Movie Lookup**:

- Function to find movie by ID for detail pages
- Function to get all movies for landing page
- Function to filter movies by genre (future enhancement)

## State Transitions

Since this is a read-only static site, there are no state transitions in the traditional sense. However, we have navigation states:

1. **Landing Page State**: Display all movies in grid format
2. **Movie Detail State**: Display single movie with full information
3. **Navigation State**: Moving between pages while preserving context

## Data Access Patterns

### Landing Page Access

```typescript
// Get all movies for landing page
const movies: MovieSummary[] = getAllMovieSummaries();
```

### Movie Detail Access

```typescript
// Get specific movie for detail page
const movie: Movie | undefined = getMovieById(id);
```

### Error Handling

```typescript
// Handle missing movies
if (!movie) {
  // Return 404 or redirect to landing page
}
```

## Sample Data Structure

```typescript
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
  // Additional movies...
];
```
