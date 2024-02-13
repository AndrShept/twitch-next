'use client';

import { useRecommendedNext } from '@/hooks/useRecommended';
import { useSidebar } from '@/store/use-sidebar';
import { User } from '@prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';

import { UserItem } from './UserItem';

interface RecommendedProps {
  data: User[];
}

export const Recommended = ({ data: users }: RecommendedProps) => {

  // const { data: users, error, isPending } = useRecommended();
  if (!users) {
    notFound();
  }
  const collapsed = useSidebar((state) => state.collapsed);
  const showLabel = !collapsed && !!users;

  // if (error) return 'An error has occurred: ' + error.message;

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
