import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Review Website',
  description: 'Discover and explore our collection of movies',
  keywords: ['movies', 'reviews', 'cinema', 'films'],
  authors: [{ name: 'Movie Review Team' }],
  openGraph: {
    title: 'Movie Review Website',
    description: 'Discover and explore our collection of movies',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie Review Website',
    description: 'Discover and explore our collection of movies',
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
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
