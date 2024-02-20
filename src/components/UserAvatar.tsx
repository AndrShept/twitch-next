import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useHoverCard } from '@/store/use-hoverCard';
import { useSidebar } from '@/store/use-sidebar';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import { useHover } from 'usehooks-ts';

import { LiveBadge } from './LiveBadge';
import { Skeleton } from './ui/skeleton';

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'size-8',
      md: 'size-10',
      lg: 'size-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}

export const UserAvatar = ({
  imageUrl,
  isLive,
  username,
  showBadge,
  size,
}: UserAvatarProps) => {
  const collapsed = useSidebar((state) => state.collapsed);
  const canShowBadge = showBadge && isLive;
  const { setHoverCar } = useHoverCard();

  return (
    <div
      onMouseEnter={() => setHoverCar({ username, imageUrl })}
      className="relative"
    >
      <Avatar
        className={cn(
          isLive && 'ring-2 ring-emerald-600 ',
          avatarSizes({ size }),
        )}
      >
        <AvatarImage src={''} className="object-cover" />
        <AvatarFallback className="font-light uppercase">{`${username[0]}${username.at(-1)}`}</AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />;
};
