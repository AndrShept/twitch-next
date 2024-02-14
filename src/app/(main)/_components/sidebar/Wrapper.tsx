'use client';

import { UserAvatarSkeleton } from '@/components/UserAvatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import React, { ReactNode, useEffect, useState } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const { collapsed } = useSidebar((state) => state);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) {
    return <SidebarSkeleton />;
  }
  return (
    <aside
      className={cn(
        'fixed flex flex-col inset-y-0 z-50 w-60 top-20 bg-secondary/60 border-r  ',
        {
          'w-[70px] transition-all': collapsed,
          '  transition-all ': !collapsed,
        },
      )}
    >
      {children}
    </aside>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside
      className={cn(
        'fixed flex flex-col items-center   inset-y-0 z-50 lg:w-60 w-[70px] top-20 bg-secondary/60 border-r   p-3 ',
      )}
    >
      <ul className="lg:mt-7 mt-3 flex flex-col lg:items-stretch items-center gap-4  w-full">
        {[...Array(6)].map((_, idx) => (
          <RecommendedSkeleton key={idx} />
        ))}
      </ul>
    </aside>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <div className="flex items-center gap-4  ">
      <div>
        <UserAvatarSkeleton size={'md'} />
      </div>

      <Skeleton className=" h-6 w-full   hidden lg:block" />
    </div>
  );
};
