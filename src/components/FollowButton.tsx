'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import React from 'react';

import { useFollow } from '../hooks/useFollow';

interface FollowButtonProps {
  userId: string;
  isUserFollowExist: boolean | undefined;
  className?: string;
}

export const FollowButton = ({
  userId,
  isUserFollowExist,
  className,
}: FollowButtonProps) => {
  const { isPending, onFollow } = useFollow(userId);
  return (
    <>
      <Button size={'sm'} className={cn('',className)} disabled={isPending} onClick={onFollow}>
        <Heart
          className={cn('mr-1 size-5' , {
            'fill-red-500 stroke-red-500': isUserFollowExist,
          })}
        />
        {!isUserFollowExist ? 'Follow' : 'Unfollow'}
      </Button>
    </>
  );
};
