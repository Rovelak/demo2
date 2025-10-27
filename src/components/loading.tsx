'use client';

import { Card, CardContent } from '@/components/ui/card';

export function MovieCardSkeleton() {
  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] w-full bg-gray-200 animate-pulse rounded-t-lg" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
          <div className="flex flex-wrap gap-1 mb-2">
            <div className="h-5 w-16 bg-gray-200 animate-pulse rounded" />
            <div className="h-5 w-20 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-8 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-12 bg-gray-200 animate-pulse rounded ml-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function MovieDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-12 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster skeleton */}
        <div className="lg:col-span-1">
          <div className="aspect-[2/3] w-full bg-gray-200 animate-pulse rounded-lg" />
        </div>

        {/* Details skeleton */}
        <div className="lg:col-span-2">
          <div className="h-8 bg-gray-200 animate-pulse rounded mb-4" />
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 w-18 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-6 w-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Related movies skeleton */}
      <div className="mt-12">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PageLoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}
