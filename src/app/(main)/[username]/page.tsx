import { StreamPlayer } from '@/components/stream-player/StreamPlayer';
import { prisma } from '@/lib/db/prisma';
import { getChat } from '@/lib/services/chat-service';
import { getUserByUsername } from '@/lib/services/user-service';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import { isBlockingUser } from '../../actions/block';
import { isFollowingUser } from '../../actions/follow';

interface UserPageProps {
  params: { username: string };
}

export const generateMetadata = async ({
  params,
}: UserPageProps): Promise<Metadata> => {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });
  return {
    title: user?.username + ' - Stream Verse',
    description: user?.bio,
  };
};

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
   
      <StreamPlayer
        isFollowing={isUserFollowExist}
        stream={user.stream}
        user={user}
      />
 
  );
};

export default UserPage;
