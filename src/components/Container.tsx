'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import React, { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => {
  const collapsed = useSidebar((state) => state.collapsed);

  return (
    <section
      className={cn('flex-1 lg:p-6 p-2 lg:ml-60 flex flex-col ml-[70px] ', {
     
      })}
    >
      {children}
    </section>
  );
};
