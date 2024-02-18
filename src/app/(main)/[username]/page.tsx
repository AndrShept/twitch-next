import { getUserByUsername } from '@/lib/services/user-service';
import { notFound } from 'next/navigation';
import React from 'react';

import { BlockButton } from './_components/BlockButton';
import { FollowButton } from './_components/FollowButton';
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
  return (
    <div className="space-x-2">
      {user?.username}
      <FollowButton userId={user.id} isUserFollowExist={isUserFollowExist} />
      <BlockButton userId={user.id} isUserBlockExist={isUserBlockExist} />
    </div>
  );
};

export default UserPage;
