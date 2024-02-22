import { Skeleton } from '@/components/ui/skeleton';
import { getStream } from '@/lib/services/feed-secrvice';
import React from 'react';

import { ResultCardSkeleton, StreamCard } from './StreamCard';

export const StreamList = async () => {
  const streams = await getStream();
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        Streams we think you&apos;ll like
      </h2>
      {streams.length === 0 && (
        <div className="text-muted-foreground text-sm">No streams found.</div>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {streams.map((stream) => (
          <StreamCard key={stream.id} stream={stream} />
        ))}
      </ul>
    </section>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
