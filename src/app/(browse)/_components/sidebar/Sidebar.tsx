'use client';

import { useRecommended } from '@/hooks/useRecommended';
import React from 'react';

import { Recommended, RecommendedSkeleton } from './Recommended';
import { Toggle } from './Toggle';
import { Wrapper } from './Wrapper';

export const Sidebar = () => {
  const { isPending } = useRecommended();

  if (isPending) {
    return <SidebarSkeleton />;
  }
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0 ">
        <Recommended />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed flex flex-col items-center   inset-y-0 z-50 lg:w-60 top-20 bg-secondary/60 border-r  w-[70px] p-3 ">
      <ul className="lg:mt-7 mt-3 flex flex-col lg:items-stretch items-center gap-4  w-full">
        {[...Array(6)].map((_, idx) => (
          <RecommendedSkeleton key={idx} />
        ))}
      </ul>
    </aside>
  );
};
