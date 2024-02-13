'use client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useHoverCard } from '@/store/use-hoverCard';
import React, { ReactNode } from 'react';

import { UserAvatar } from './UserAvatar';

interface HoverCardActionProps {
  children: ReactNode;
}

export const HoverCardAction = ({ children }: HoverCardActionProps) => {
  const  data  = useHoverCard(state => state.data);
  console.log(data);
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="w-fit">
        {data.username}
        <UserAvatar imageUrl={data.imageUrl} username={data.username} />
      </HoverCardContent>
    </HoverCard>
  );
};
