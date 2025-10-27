import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilmIcon, HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <FilmIcon className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Movie Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Sorry, we couldn&apos;t find the movie you&apos;re looking for. It
              might have been removed or the link might be incorrect.
            </p>
            <div className="space-y-2">
              <Link href="/" className="block">
                <Button className="w-full" size="lg">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Back to Movies
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
