'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

import { useBlock } from '../../hooks/useBlock';

interface BlockButtonProps {
  userId: string;
  isUserBlockExist: boolean | undefined;
}

export const BlockButton = ({ userId, isUserBlockExist }: BlockButtonProps) => {
  const { isPending, onBlock } = useBlock(userId);

  return (
    <Button disabled={isPending} onClick={onBlock}>
      {!isUserBlockExist ? 'Block' : 'Unblock'}
    </Button>
  );
};
