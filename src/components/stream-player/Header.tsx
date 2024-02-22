'use client';

import { FollowButton } from '@/components/FollowButton';
import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react';
import { UserIcon } from 'lucide-react';
import React from 'react';

import { UserAvatar, UserAvatarSkeleton } from '../UserAvatar';
import { VerifiedMark } from '../VerifiedMark';
import { Skeleton } from '../ui/skeleton';

interface HeaderProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
}

export const Header = ({
  hostIdentity,
  hostName,
  imageUrl,
  isFollowing,
  name,
  viewerIdentity,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);
  const isLive = !!participant;
  const participantCount = participants.length - 1;
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <header className="flex  items-center gap-y-2 justify-between    lg:p-6 p-4">
      <section className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size={'lg'}
          isLive={isLive}
          showBadge={true}
        />
        <div className="flex flex-col  gap-x-2">
          <div className="flex items-center gap-x-2">
            <h2 className="text-base font-semibold break-all line-clamp-1 ">
              {hostName}
            </h2>
            <VerifiedMark />
          </div>

          <p className="text-muted-foreground text-sm break-all line-clamp-1 font-semibold">
            {name}
          </p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-sm text-rose-500">
              <UserIcon className="size-4" />
              <p>
                {participantCount}
                {participantCount === 1 ? ' viewer' : ' viewers'}
              </p>
            </div>
          ) : (
            <p className="text-sm text-rose-500">offline</p>
          )}
        </div>
      </section>
      {!isHost && (
        <FollowButton
          className="w-fit"
          userId={hostIdentity}
          isUserFollowExist={isFollowing}
        />
      )}
      {/* <BlockButton userId={user.id} isUserBlockExist={isUserBlockExist} /> */}
    </header>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      {/* <ActionsSkeleton /> */}
    </div>
  );
};
