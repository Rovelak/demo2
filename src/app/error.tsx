'use client';

import { useEffect } from 'react';
import { DefaultErrorFallback } from '@/components/error-boundary';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return <DefaultErrorFallback error={error} retry={reset} />;
}
