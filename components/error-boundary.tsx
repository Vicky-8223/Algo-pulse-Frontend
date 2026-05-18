'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[v0] Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">{error.message || 'An unexpected error occurred'}</p>
        </div>

        <div className="flex gap-4">
          <Button onClick={reset} className="flex-1">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="outline" className="flex-1">
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
