'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import React, { ReactNode, useEffect, useState } from 'react';

export const Container = ({ children }: { children: ReactNode }) => {
  const [isMount, setIsMount] = useState(false);
  const collapsed = useSidebar((state) => state.collapsed);

  useEffect(() => {
    setTimeout(() => {
      setIsMount(true);
    }, 100);
  }, []);
  if (!isMount) {
    return (
      <section
        className={cn('flex-1  ml-[70px] lg:ml-60   flex flex-col  ', {
          // 'ml-[70px]': collapsed,
          // 'ml-60': !collapsed,
        })}
      >
        {children}
      </section>
    );
  }
  return (
    <section
      className={cn('flex-1     flex flex-col  ', {
        'ml-[70px]': collapsed,
        'ml-60': !collapsed,
      })}
    >
      {children}
    </section>
  );
};
