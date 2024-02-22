'use client';

import { Thumbnail, ThumbnailSkeleton } from '@/components/Thumbnail';
import { UserAvatar, UserAvatarSkeleton } from '@/components/UserAvatar';

import { Skeleton } from '@/components/ui/skeleton';
import { useViewerToken } from '@/hooks/useViewerToken';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';
import Link from 'next/link';

interface StreamCardProps {
  stream: Stream & { user: User };
}

export const StreamCard = ({ stream }: StreamCardProps) => {
  const { token } = useViewerToken(stream.user.id);
  return (
    <Link href={`/${stream.user.username}`}>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      >
        <div className="h-full w-full space-y-4 border hover:border-primary  rounded-md min-w-[340px] max-w-[400px] transition">
          <Thumbnail
            thumbnailUrl={stream.thumbnailUrl}
            userImageUrl={stream.user.imageUrl}
            isLive={stream.isLive}
            username={stream.user.username}
          />
          <div className="flex gap-x-3 p-4">
            <div>
              <UserAvatar
                username={stream.user.username}
                imageUrl={stream.user.imageUrl}
                isLive={stream.isLive}
              />
            </div>

            <div className="flex flex-col text-sm break-all line-clamp-1 ">
              <p className="truncate font-semibold hover:text-yellow-400 transition ">
                {stream.name}
              </p>
              <p className="text-muted-foreground break-all line-clamp-1">
                {stream.user.username}
              </p>
            </div>
          </div>
        </div>
      </LiveKitRoom>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
