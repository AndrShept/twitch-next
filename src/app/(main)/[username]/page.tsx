import { StreamPlayer } from '@/components/stream-player/StreamPlayer';
import { getUserByUsername } from '@/lib/services/user-service';
import { notFound } from 'next/navigation';
import React from 'react';

import { isBlockingUser } from '../../actions/block';
import { isFollowingUser } from '../../actions/follow';

interface UserPageProps {
  params: { username: string };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isUserFollowExist = await isFollowingUser(user.id);
  const isUserBlockExist = await isBlockingUser(user.id);

  if (isUserBlockExist) {
    notFound();
  }
  return (
    <div className="">
      <StreamPlayer
        isFollowing={isUserFollowExist}
        stream={user.stream}
        user={user}
      />
    </div>
  );
};

export default UserPage;
