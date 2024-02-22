import { Skeleton } from '@/components/ui/skeleton';
import { getStream } from '@/lib/services/feed-secrvice';
import React, { Suspense } from 'react';

import { StreamCard, StreamCardSkeleton } from './StreamCard';

export const StreamList = async () => {
  const streams = await getStream();

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold mb-4">
        Streams we think you&apos;ll like
      </h2>
      {streams.length === 0 && (
        <div className="text-muted-foreground text-sm">No streams found.</div>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {streams.map((stream) => (
          <StreamCard key={stream.id} stream={stream} />
        ))}{' '}
      </ul>
    </div>
  );
};

export const StreamListSkeleton = () => {
  return (
    <>
    
      {[...Array(4)].map((_, i) => (
        <StreamCardSkeleton key={i} />
      ))}
    </>
  );
};
