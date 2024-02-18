'use client';

import { UserAvatarSkeleton } from '@/components/UserAvatar';
import { useSidebar } from '@/store/use-sidebar';
import { Follow, User } from '@prisma/client';

import { UserItem } from './UserItem';

interface FollowingProps {
  data: (Follow & {
    followingUser:
      | (User & {
          stream: { isLive: boolean } | null;
        })
      | null;
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) {
    return null;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.followingUser!.id}
            username={follow.followingUser!.username}
            imageUrl={follow.followingUser!.imageUrl}
            isLive={follow.followingUser!.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserAvatarSkeleton key={i} />
      ))}
    </ul>
  );
};
