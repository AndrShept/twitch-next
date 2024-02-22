'use client';

import { HoverCardAction } from '@/components/HoverCardAction';
import { LiveBadge } from '@/components/LiveBadge';
import { ParticipantCount } from '@/components/ParticipantCount';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { useViewerToken } from '@/hooks/useViewerToken';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { LiveKitRoom, useParticipants } from '@livekit/components-react';
import { UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface UserItemProps {
  userId: string;
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export const UserItem = ({
  imageUrl,
  username,
  isLive,
  userId,
}: UserItemProps) => {
  const pathname = usePathname();
  const collapsed = useSidebar((state) => state.collapsed);
  const href = `/${username}`;
  const isActive = href === pathname;

  const { token } = useViewerToken(userId);
  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
    >
      <Button
        asChild
        variant={'ghost'}
        className={cn('w-full h-12 justify-start ', {
          'justify-center': collapsed,
          'bg-secondary': isActive,
        })}
      >
        <Link href={href}>
          <div
            className={cn(
              'flex items-center justify-between w-full gap-x-4',
              collapsed && 'justify-center',
            )}
          >
            <div className='flex items-center gap-2'>
              <HoverCardAction>
                <UserAvatar
                  imageUrl={imageUrl}
                  username={username}
                  isLive={isLive}
                  showBadge
                />
              </HoverCardAction>
              {!collapsed && (
                <p className="break-all line-clamp-1">{username}</p>
              )}
            </div>

            {!collapsed && isLive && (
              <div>
                <div className="flex items-center justify-between ">
                  <div className="p-1 rounded-full bg-rose-600 mr-2" />
                  <ParticipantCount />
                </div>
              </div>
            )}
          </div>
        </Link>
      </Button>
    </LiveKitRoom>
  );
};
