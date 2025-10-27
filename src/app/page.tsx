import type { Metadata } from 'next';
import { getAllMovieSummaries } from '@/lib/movie-service';
import { MovieGrid } from '@/components/movie-grid';
import { HomePage } from '@/components/home-page';

export const metadata: Metadata = {
  title: 'Movie Collection - Browse Movies | Movie Review Website',
  description:
    'Browse our curated collection of top-rated movies including The Shawshank Redemption, The Godfather, The Dark Knight, and more. Discover detailed information, cast, and reviews.',
  keywords: [
    'movies',
    'film collection',
    'movie reviews',
    'cinema',
    'top movies',
    'IMDb',
    'movie database',
  ],
  openGraph: {
    title: 'Movie Collection - Browse Movies',
    description:
      'Browse our curated collection of top-rated movies. Discover detailed information, cast, and reviews.',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie Collection - Browse Movies',
    description:
      'Browse our curated collection of top-rated movies. Discover detailed information, cast, and reviews.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  const movies = getAllMovieSummaries();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Movie Review Website',
            url: typeof window !== 'undefined' ? window.location.origin : '',
            description:
              'Discover and explore our curated collection of movies',
            potentialAction: {
              '@type': 'SearchAction',
              target: '/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Movie Collection',
            description: 'Curated collection of top-rated movies',
            numberOfItems: movies.length,
            itemListElement: movies
              .sort((a, b) => b.imdbRating - a.imdbRating)
              .slice(0, 10)
              .map((movie, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Movie',
                  name: movie.title,
                  genre: movie.genre,
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: movie.imdbRating,
                    bestRating: 10,
                    worstRating: 1,
                  },
                },
              })),
          }),
        }}
      />

      <HomePage movies={movies} />
    </>
  );
}
