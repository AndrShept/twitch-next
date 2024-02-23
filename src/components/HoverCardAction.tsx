'use client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useHoverCard } from '@/store/use-hoverCard';
import Image from 'next/image';
import React, { ReactNode } from 'react';

import { UserAvatar } from './UserAvatar';

interface HoverCardActionProps {
  children: ReactNode;
}

export const HoverCardAction = ({ children }: HoverCardActionProps) => {
  const data = useHoverCard((state) => state.data);
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <div className="flex gap-2 items-start">
          <UserAvatar
            bio={data.bio!}
            thumbnailUrl={data.thumbnailUrl!}
            imageUrl={data.imageUrl}
            username={data.username}
          />
          <div className="flex flex-col ">
            <p> {data.username}</p>
            <p className="text-sm text-muted-foreground"> {data.bio}</p>
            {data.thumbnailUrl && (
              <div className="relative aspect-video w-[200px]">
                <Image
                  className="object-cover"
                  fill
                  src={data.thumbnailUrl}
                  alt="image"
                />
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
