'use client';

import { useViewerToken } from '@/hooks/useViewerToken';
import { cn } from '@/lib/utils';
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';
import React from 'react';

import { AboutCard } from './AboutCard';
import { Chat, ChatSkeleton } from './Chat';
import { ChatToggle } from './ChatToggle ';
import { Header, HeaderSkeleton } from './Header';
import { InfoCard } from './InfoCard';
import { Video, VideoSkeleton } from './Video';

interface StreamPlayerProps {
  user: User & { stream: Stream | null; _count: { followedBy: number } };
  stream: Stream | null;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  isFollowing,
  stream,
  user,
}: StreamPlayerProps) => {
  const { collapsed } = useChatSidebar((state) => state);
  const { identity, name, token } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }
  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] bg-black rounded-md right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 h-full',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2',
        )}
      >
        <div className=" col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-3 lg:overflow-y-auto hidden-scrollbar  ">
          <Video hostName={user.username} hostIdentity={user.id} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={
              user.bio ||
              'This user prefers to keep an air of mystery about them.'
            }
            followedByCount={user._count.followedBy}
          />
        </div>

        <div className={cn('col-span-1 h-full ', collapsed && 'hidden')}>
          <Chat
            streamId={stream.id}
            viewerName={name}
            viewerIdentity={identity}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
