import { UserAvatarSkeleton } from '@/components/UserAvatar';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

import { UserItem } from './UserItem';
import { getRecommended } from './actions/get-recommended';

export const RecommendedSSR = async () => {

  const users = await getRecommended();
  // const collapsed = useSidebar((state) => state.collapsed);
  const showLabel = !!users;

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
