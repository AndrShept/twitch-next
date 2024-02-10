import { getProfile } from './auth-service';
import { prisma } from './prisma';

export const isFollowingUser = async (id: string) => {
  try {
    const profile = await getProfile();
    const otherUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error('User not found');
    }

    if (otherUser.id === profile.id) {
      return true;
    }
    const existingFollow = await prisma.follow.findFirst({
      where: { followerId: profile.id, followingId: otherUser.id },
    });
    return !!existingFollow;
  } catch (error) {
    return false;
  }
};
export const followUser = async (id: string) => {
  const profile = await getProfile();
  const otherUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error('User not found');
  }

  if (otherUser.id === profile.id) {
    throw new Error('Cannot follow yourself');
  }

  const existingFollow = await prisma.follow.findFirst({
    where: { followerId: profile.id, followingId: otherUser.id },
  });
  if (existingFollow) {
    throw new Error('Already following');
  }
  const follow = await prisma.follow.create({
    data: { followerId: profile.id, followingId: otherUser.id },
    include: { follower: true, following: true },
  });
  return follow
};
