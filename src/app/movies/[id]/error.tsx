'use client';

import { useEffect } from 'react';
import { MovieErrorFallback } from '@/components/error-boundary';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Movie page error:', error);
  }, [error]);

  return <MovieErrorFallback error={error} retry={reset} />;
}
