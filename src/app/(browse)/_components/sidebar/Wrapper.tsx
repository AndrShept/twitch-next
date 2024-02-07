'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import React, { ReactNode } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <aside
      className={cn(
        'fixed flex flex-col inset-y-0 z-50 w-60 top-20 bg-secondary/60 border-r  ',
        {
          'w-[70px] ': collapsed,
        },
      )}
    >
      {children}
    </aside>
  );
};
