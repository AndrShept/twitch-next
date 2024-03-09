'use client'
import { Thumbnail } from '@/components/Thumbnail';
import { VerifiedMark } from '@/components/VerifiedMark';
import { Skeleton } from '@/components/ui/skeleton';
import { useViewerToken } from '@/hooks/useViewerToken';
import { LiveKitRoom } from '@livekit/components-react';
import { User } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface ResultCardProps {
  stream: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User;
  };
}

export const ResultCard = ({ stream }: ResultCardProps) => {
  const { token } = useViewerToken(stream.user.id);
  if (!token) {
    return <ResultCardSkeleton />;
  }
  return (
    <Link className="w-fit " href={`/${stream.user.username}`}>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      >
        <div className="flex gap-x-4 rounded-xl md:px-4 px-2 py-10 hover:border-primary border w-fit bg-secondary/30 transition">
          <div className="relative h-[9rem] w-[16rem]">
            <Thumbnail
              thumbnailUrl={stream.thumbnailUrl}
              userImageUrl={stream.user.imageUrl}
              isLive={stream.isLive}
              username={stream.user.username}
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-x-2">
              <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
                {stream.user.username}
              </p>
              <VerifiedMark />
            </div>
            <p className="text-sm text-muted-foreground">{stream.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(stream.updatedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </LiveKitRoom>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return [...Array(2)].map((_, idx) => (
    <div
      key={idx}
      className="  rounded-xl relative max-w-[426px] h-[230px] w-full    "
    >
      <Skeleton className=" w-full  h-full " />
    </div>
  ));
};
