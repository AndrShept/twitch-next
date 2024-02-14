'use client'
import { HoverCardAction } from '@/components/HoverCardAction';
import { LiveBadge } from '@/components/LiveBadge';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export const UserItem = ({ imageUrl, username, isLive }: UserItemProps) => {
  const pathname = usePathname();
  const collapsed = useSidebar((state) => state.collapsed);
  const href = `/${username}`;
  const isActive = href === pathname;
  return (
    <Button
      asChild
      variant={'ghost'}
      className={cn('w-full h-12 justify-start', {
        'justify-center': collapsed,
      })}
    >
      <Link href={href}>
        <div
          className={cn(
            'flex items-center w-full gap-x-4',
            collapsed && 'justify-center',
          )}
        >
          <HoverCardAction>
            <UserAvatar
            
              imageUrl={imageUrl}
              username={username}
              isLive={isLive}
              showBadge
            />
          </HoverCardAction>
          {!collapsed && <p className="break-all line-clamp-1">{username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
};
