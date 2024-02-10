import { getProfile } from '@/lib/auth-service';
import { isFollowingUser } from '@/lib/follow-service';
import { getUser } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import React from 'react';

import { FollowButton } from './_components/FollowButton';

interface UserPageProps {
  params: { username: string };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id);
  console.log(isFollowing);
  if (!user) {
    notFound();
  }
  return (
    <div>
      {user?.username}
      <FollowButton isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
