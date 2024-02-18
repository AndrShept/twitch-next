'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

import { useFollow } from '../../../../hooks/useFollow';

interface FollowButtonProps {
  userId: string;
  isUserFollowExist: boolean | undefined;
}

export const FollowButton = ({
  userId,
  isUserFollowExist,
}: FollowButtonProps) => {
  const { isPending, onFollow } = useFollow(userId);
  return (
    <>
      <Button disabled={isPending} onClick={onFollow}>
        {!isUserFollowExist ? 'Follow' : 'Unfollow'}
      </Button>
    </>
  );
};
