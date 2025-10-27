import dynamic from 'next/dynamic';
import { PageLoadingSpinner } from '@/components/loading';

// Lazy load heavy components for better performance
export const LazyMovieGrid = dynamic(
  () =>
    import('@/components/movie-grid').then((mod) => ({
      default: mod.MovieGrid,
    })),
  {
    loading: () => <PageLoadingSpinner />,
    ssr: true,
  }
);

export const LazyMovieDetails = dynamic(
  () =>
    import('@/components/movie-details').then((mod) => ({
      default: mod.MovieDetails,
    })),
  {
    loading: () => <PageLoadingSpinner />,
    ssr: true,
  }
);

export const LazyErrorBoundary = dynamic(
  () =>
    import('@/components/error-boundary').then((mod) => ({
      default: mod.ErrorBoundary,
    })),
  {
    loading: () => null,
    ssr: false,
  }
);
