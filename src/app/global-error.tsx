'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
        <h2>Something went wrong!</h2>
        <Button variant={'destructive'} onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
