# Component Contracts: Movie Review Website

**Feature**: Movie Review Website  
**Created**: October 27, 2025  
**Phase**: 1 - Component and Page Contracts

## Page Contracts

### Landing Page (`/`)

**Purpose**: Display all available movies in a grid layout

**Props**: None (static page)

**Data Requirements**:

- Load all movies from static data
- Transform to MovieSummary format for performance

**Rendering Contract**:

```typescript
interface LandingPageContract {
  // Data
  movies: MovieSummary[];

  // Behavior
  onMovieClick: (movieId: string) => void; // Navigate to detail page

  // UI States
  loading: false; // Static data, no loading state
  error: undefined; // Static data, no error state
}
```

**SEO Requirements**:

- Page title: "Movie Review Website"
- Meta description: "Discover and explore our collection of movies"
- Open Graph tags for social sharing

---

### Movie Detail Page (`/movie/[id]`)

**Purpose**: Display detailed information about a specific movie

**Props**:

```typescript
interface MovieDetailPageProps {
  params: {
    id: string; // Movie ID from URL
  };
}
```

**Data Requirements**:

- Load specific movie by ID from static data
- Handle missing movies (404 case)

**Rendering Contract**:

```typescript
interface MovieDetailPageContract {
  // Data
  movie: Movie | null;

  // Behavior
  onBackClick: () => void; // Navigate back to landing page

  // UI States
  loading: false; // Static data, no loading state
  error: boolean; // True if movie not found
}
```

**SEO Requirements**:

- Dynamic page title: "[Movie Title] - Movie Review"
- Meta description: Movie description (truncated to 160 chars)
- Open Graph tags with movie poster

---

## Component Contracts

### MovieCard Component

**Purpose**: Display movie summary information in grid layout

**Props**:

```typescript
interface MovieCardProps {
  movie: MovieSummary;
  onClick: (movieId: string) => void;
  className?: string;
}
```

**Rendering Contract**:

- Display movie poster image with alt text
- Show movie title, release year, genre
- Display IMDb rating with star icon
- Hover effects for interactivity
- Responsive design (mobile/tablet/desktop)

**Accessibility**:

- Proper alt text for poster images
- Keyboard navigation support
- Focus indicators
- Screen reader friendly structure

---

### MovieGrid Component

**Purpose**: Layout movies in responsive grid

**Props**:

```typescript
interface MovieGridProps {
  movies: MovieSummary[];
  onMovieClick: (movieId: string) => void;
  className?: string;
}
```

**Rendering Contract**:

- Responsive grid (1 col mobile, 2-3 tablet, 4+ desktop)
- Consistent spacing and alignment
- Handle empty state gracefully
- Maintain aspect ratios across devices

---

### MovieDetails Component

**Purpose**: Display full movie information on detail page

**Props**:

```typescript
interface MovieDetailsProps {
  movie: Movie;
  onBackClick: () => void;
  className?: string;
}
```

**Rendering Contract**:

- Large poster image with proper loading
- Full movie information in structured layout
- Cast list with proper formatting
- Genre tags as interactive elements
- Back navigation button
- Responsive layout for all screen sizes

---

## Navigation Contracts

### Static Route Generation

```typescript
// Generate static params for movie detail pages
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return movies.map((movie) => ({
    id: movie.id,
  }));
}
```

### Metadata Generation

```typescript
// Generate metadata for movie detail pages
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const movie = getMovieById(params.id);

  if (!movie) {
    return {
      title: "Movie Not Found",
    };
  }

  return {
    title: `${movie.title} - Movie Review`,
    description: movie.description.substring(0, 160),
    openGraph: {
      title: movie.title,
      description: movie.description,
      images: [movie.posterUrl],
    },
  };
}
```

## Error Handling Contracts

### 404 Movie Not Found

**Trigger**: Accessing `/movie/[invalid-id]`

**Response**:

- Display user-friendly error message
- Provide link back to landing page
- Suggest browsing all movies
- Maintain site navigation structure

### Empty Movie List

**Trigger**: No movies available in data

**Response**:

- Display "No movies available" message
- Provide call-to-action for content updates
- Maintain page structure and navigation

## Performance Contracts

### Image Loading

- Use Next.js Image component for automatic optimization
- Implement lazy loading for movie posters
- Provide proper aspect ratios to prevent layout shift
- Include blur placeholders for smooth loading

### Static Generation

- Pre-generate all movie detail pages at build time
- Optimize bundle size through code splitting
- Minimize CSS and JavaScript output
- Leverage browser caching for static assets
