'use client';

import { useSidebar } from '@/store/use-sidebar';
import { Stream, User } from '@prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';

import { UserItem } from './UserItem';

interface RecommendedProps {
  data: (User & { stream: Stream | null })[]
 
}

export const Recommended = ({ data: users }: RecommendedProps) => {
  if (!users) {
    notFound();
  }
  const collapsed = useSidebar((state) => state.collapsed);
  const showLabel = !collapsed && !!users;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="p-2 ">
        {users?.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};
