'use client';

import { VerifiedMark } from '../VerifiedMark';
import { BioModal } from './BioModal';

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string;
  followedByCount: number;
}

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? 'follower' : 'followers';

  return (
    <section className='px-4 '>
      <div className="group rounded-xl bg-secondary/60   flex flex-col gap-y-3 lg:p-8 p-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl text-yellow-400">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{' '}
          {followedByLabel}
        </div>
        <p className="text-sm">{bio}</p>
      </div>
    </section>
  );
};
