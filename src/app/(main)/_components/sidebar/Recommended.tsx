'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { Stream, User } from '@prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';

import { UserItem } from './UserItem';

interface RecommendedProps {
  data: (User & { stream: Stream | null })[];
}

export const Recommended = ({ data: users }: RecommendedProps) => {
  if (!users) {
    notFound();
  }
  const collapsed = useSidebar((state) => state.collapsed);
  const showLabel = !collapsed && !!users;

  return (
    <>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ScrollArea
        className={cn('gap-y-1 py-2   ', {
          'p-2': !collapsed,
        })}
      >
        {users?.map((user) => <UserItem key={user.id} user={user} />)}
      </ScrollArea>
    </>
  );
};
