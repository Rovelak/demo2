import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { Movie } from '@/types/movie';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-1 text-sm text-muted-foreground"
    >
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <HomeIcon className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRightIcon className="h-4 w-4" />
          {item.href && !item.isCurrentPage ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                item.isCurrentPage ? 'text-foreground font-medium' : ''
              }
              aria-current={item.isCurrentPage ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

interface MovieBreadcrumbProps {
  movie: Movie;
}

export function MovieBreadcrumb({ movie }: MovieBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    { label: 'Movies', href: '/' },
    { label: movie.title, isCurrentPage: true },
  ];

  return <Breadcrumb items={items} />;
}
