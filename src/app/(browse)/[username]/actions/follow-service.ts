'use server';

import { prisma } from '@/lib/db/prisma';
import { getSelfUser } from '@/lib/services/auth-service';
import { revalidatePath } from 'next/cache';

export const isFollowingUser = async (userId: string) => {
  try {
    const self = await getSelfUser();
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.id === self.id) {
      return true;
    }
    const existingFollow = await prisma.follow.findFirst({
      where: { followerId: self.id, followingId: userId },
    });
    if (existingFollow) {
      return true;
    } else {
      false;
    }
  } catch (error) {
    return false;
  }
};
export const followUser = async (id: string) => {
  const self = await getSelfUser();
  const otherUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error('User not found');
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot follow yourself');
  }

  const existingFollow = await prisma.follow.findFirst({
    where: { followerId: self.id, followingId: otherUser.id },
  });
  if (existingFollow) {
    await prisma.follow.deleteMany({
      where: { followerId: self.id, followingId: otherUser.id },
    });
    revalidatePath(`/${self.username}`);
  } else {
    const followedUser = await prisma.follow.create({
      data: { followerId: self.id, followingId: otherUser.id },
      include: { followerUser: true, followingUser: true },
    });

    revalidatePath(`/${self.username}`);
    return followedUser;
  }
};

