'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FilmIcon, HomeIcon } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <FilmIcon className="h-6 w-6" />
            <span className="font-bold text-lg">Movie Review</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {!isHomePage && (
              <Button variant="ghost" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
