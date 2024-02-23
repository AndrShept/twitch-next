import { UsersIcon } from 'lucide-react';
import Image from 'next/image';

import { LiveBadge } from './LiveBadge';
import { ParticipantCount } from './ParticipantCount';
import { UserAvatar } from './UserAvatar';
import { Skeleton } from './ui/skeleton';

interface ThumbnailProps {
  thumbnailUrl: string | null;
  userImageUrl: string;
  isLive: boolean;
  username: string;
}

export const Thumbnail = ({
  thumbnailUrl,
  userImageUrl,
  isLive,
  username,
}: ThumbnailProps) => {
  let content;

  if (!thumbnailUrl) {
    content = (
      <div className="bg-secondary flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-t-md">
        <UserAvatar
          thumbnailUrl={thumbnailUrl!}
          size="lg"
          showBadge
          username={username}
          imageUrl={userImageUrl}
          isLive={isLive}
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={thumbnailUrl}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-t-md"
      />
    );
  }

  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-t-md absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
      {isLive && thumbnailUrl && (
        <div className="absolute top-2 left-2 flex flex-col gap-1  group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform ">
          <LiveBadge />
          <div className="flex items-center justify-between ">
            <UsersIcon className="size-4" />
            <ParticipantCount />
          </div>
        </div>
      )}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
