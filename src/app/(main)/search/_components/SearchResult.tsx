import { getStream } from '@/lib/services/feed-secrvice';
import { SearchXIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { ResultCard } from './ResultCard';

interface SearchResultProps {
  term: string;
}

export const SearchResult = async ({ term }: SearchResultProps) => {
  const streams = await getStream(term);
  if (!streams.length) {
    return (
      <div className="text-muted-foreground flex items-center gap-2">
        No results found
        <span>
          <SearchXIcon />
        </span>
      </div>
    );
  }
  return (
    <>
      {streams.map((stream) => (
        <ResultCard key={stream.id} stream={stream} />
      ))}
    </>
  );
};
