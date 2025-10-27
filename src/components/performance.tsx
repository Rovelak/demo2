'use client';

import { useEffect } from 'react';

// Web Vitals monitoring
export function WebVitalsReporter() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'production'
    ) {
      // Only import and use web-vitals in production
      import('web-vitals')
        .then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
          onCLS(console.log);
          onFCP(console.log);
          onLCP(console.log);
          onTTFB(console.log);
          onINP(console.log);
        })
        .catch(() => {
          // Silently fail if web-vitals is not available
        });
    }
  }, []);

  return null;
}

// Performance optimization component for image preloading
export function ImagePreloader({ imageUrls }: { imageUrls: string[] }) {
  useEffect(() => {
    // Preload critical images
    const preloadImages = imageUrls.slice(0, 4); // Only preload first 4 images

    preloadImages.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });

    // Cleanup
    return () => {
      preloadImages.forEach((url) => {
        const existingLink = document.querySelector(`link[href="${url}"]`);
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, [imageUrls]);

  return null;
}

// Prefetch component for route preloading
export function RoutePrefetcher({ routes }: { routes: string[] }) {
  useEffect(() => {
    // Prefetch important routes
    routes.forEach((route) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });

    return () => {
      routes.forEach((route) => {
        const existingLink = document.querySelector(
          `link[href="${route}"][rel="prefetch"]`
        );
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, [routes]);

  return null;
}
