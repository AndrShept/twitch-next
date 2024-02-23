import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

import { ResultCardSkeleton } from './_components/ResultCard';
import { SearchResult } from './_components/SearchResult';

interface SearchPageProps {
  searchParams: { term: string };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.term) {
    redirect('/');
  }
  return (
    <div className="flex-1 sm:p-8 p-3 py-4 flex flex-col gap-4 ">
      <h1 className="font-semibold text-2xl">
        Result for search{' '}
        <span className="text-yellow-400">{searchParams.term}</span>:
      </h1>
      <Suspense fallback={<ResultCardSkeleton />}>
        <SearchResult term={searchParams.term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
