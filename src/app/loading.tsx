import { MovieGridSkeleton } from '@/components/loading';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="h-12 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
          <div className="h-6 w-96 bg-gray-200 animate-pulse rounded mx-auto" />
        </div>
        <MovieGridSkeleton />
      </div>
    </div>
  );
}
