'use client';

import { HoverCardAction } from '@/components/HoverCardAction';
import { ParticipantCount } from '@/components/ParticipantCount';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { useViewerToken } from '@/hooks/useViewerToken';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface UserItemProps {
  user:  User & { stream: Stream | null  } ;
}

export const UserItem = ({ user }: UserItemProps) => {
  const pathname = usePathname();
  const collapsed = useSidebar((state) => state.collapsed);
  const href = `/${user.username}`;
  const isActive = href === pathname;

  const { token } = useViewerToken(user.id);
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
            <div className="flex items-center gap-2">
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
                <p className="break-all line-clamp-1">{user.username}</p>
              )}
            </div>

            {!collapsed && user.stream?.isLive && (
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
