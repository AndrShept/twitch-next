'use client';

import { UserAvatarSkeleton } from '@/components/UserAvatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecommended } from '@/hooks/useRecommended';
import { useSidebar } from '@/store/use-sidebar';
import React from 'react';

import { UserItem } from './UserItem';

export const Recommended = () => {
  const { data: users, error } = useRecommended();
  
  const collapsed = useSidebar((state) => state.collapsed);
  const showLabel = !collapsed && !!users;

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="lg:p-2 p-1">
        {users?.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
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
