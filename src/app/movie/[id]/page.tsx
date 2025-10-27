import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMovieById, getAllMovieIds } from '@/lib/movie-service';
import { MovieDetails } from '@/components/movie-details';

interface MoviePageProps {
  params: {
    id: string;
  };
}

// Generate static params for all movies at build time
export async function generateStaticParams() {
  const movieIds = getAllMovieIds();
  return movieIds.map((id) => ({
    id,
  }));
}

// Generate metadata for each movie page
export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const movie = getMovieById(params.id);

  if (!movie) {
    return {
      title: 'Movie Not Found | Movie Review Website',
    };
  }

  return {
    title: `${movie.title} (${movie.releaseYear}) | Movie Review Website`,
    description: `${movie.description} Starring ${movie.cast
      .slice(0, 3)
      .join(', ')}. Directed by ${movie.director}. IMDb Rating: ${
      movie.imdbRating
    }/10.`,
    keywords: [
      movie.title,
      ...movie.genre,
      movie.director,
      ...movie.cast.slice(0, 5),
      'movie',
      'film',
      'review',
    ],
    openGraph: {
      title: `${movie.title} (${movie.releaseYear})`,
      description: movie.description,
      type: 'video.movie',
      images: [
        {
          url: movie.posterUrl,
          width: 300,
          height: 450,
          alt: `${movie.title} poster`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${movie.title} (${movie.releaseYear})`,
      description: movie.description,
      images: [movie.posterUrl],
    },
  };
}

export default function MoviePage({ params }: MoviePageProps) {
  const movie = getMovieById(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <>
      {/* Structured Data for Movie */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Movie',
            name: movie.title,
            description: movie.description,
            image: movie.posterUrl,
            genre: movie.genre,
            director: {
              '@type': 'Person',
              name: movie.director,
            },
            actor: movie.cast.map((actor) => ({
              '@type': 'Person',
              name: actor,
            })),
            datePublished: movie.releaseYear.toString(),
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: movie.imdbRating,
              bestRating: 10,
              worstRating: 1,
            },
            duration: `PT${movie.duration}M`,
          }),
        }}
      />

      <MovieDetails movie={movie} />
    </>
  );
}
