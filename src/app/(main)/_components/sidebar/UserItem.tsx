'use client';

import { HoverCardAction } from '@/components/HoverCardAction';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { Stream, User } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface UserItemProps {
  user: User & { stream: Stream | null };
}

export const UserItem = ({ user }: UserItemProps) => {
  const pathname = usePathname();
  const collapsed = useSidebar((state) => state.collapsed);
  const href = `/${user.username}`;
  const isActive = href === pathname;

  return (
    

    
    <Button
      asChild
      variant={'ghost'}
      className={cn(' h-12 w-full justify-start text-wrap ', {
        'justify-center ': collapsed,
        'bg-secondary': isActive,
      })}
    >
      <Link
        href={href}
        className={cn(
          'flex items-center justify-between gap-x-4  ',
          collapsed && 'justify-center',
        )}
      >
        <div className="flex items-center gap-2 ">
          <HoverCardAction>
            <UserAvatar
              imageUrl={user.imageUrl}
              username={user.username}
              isLive={user.stream?.isLive}
              bio={user.bio!}
              thumbnailUrl={user.stream?.thumbnailUrl || ''}
              showBadge
            />
          </HoverCardAction>
          {!collapsed && (
            <p className=" break-all line-clamp-1">{user.username}</p>
          )}
        </div>

        {!collapsed && user.stream?.isLive && (
          <div className="p-[4px] rounded-full bg-rose-600 mr-2 " />
        )}
      </Link>
    </Button>
   
  );
};
