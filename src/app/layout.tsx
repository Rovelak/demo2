import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Movie Review Website - Discover Top Movies',
    template: '%s | Movie Review Website',
  },
  description:
    'Discover and explore our curated collection of top-rated movies including The Shawshank Redemption, The Godfather, The Dark Knight, and more. Get detailed information, cast details, and reviews.',
  keywords: [
    'movies',
    'reviews',
    'cinema',
    'films',
    'movie database',
    'IMDb',
    'top movies',
    'movie collection',
    'film reviews',
  ],
  authors: [{ name: 'Movie Review Team' }],
  creator: 'Movie Review Website',
  publisher: 'Movie Review Website',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Movie Review Website - Discover Top Movies',
    description:
      'Discover and explore our curated collection of top-rated movies. Get detailed information, cast details, and reviews.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Movie Review Website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie Review Website - Discover Top Movies',
    description:
      'Discover and explore our curated collection of top-rated movies. Get detailed information, cast details, and reviews.',
    creator: '@moviereview',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token_here',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
