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
      where: { followingId: self.id, followedById: userId },
    });
    if (existingFollow) {
      return true;
    } 
  } catch (error) {
    return false;
  }
  return false
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
    where: { followingId: self.id, followedById: id },
  });
  if (existingFollow) {
    await prisma.follow.deleteMany({
      where: { followingId: self.id, followedById: id },
    });
    revalidatePath(`/${self.username}`);
  } else {
    const followedUser = await prisma.follow.create({
      data: { followingId: self.id, followedById: id },
      include: { followingUser: true, followedByUser: true },
    });

    revalidatePath(`/${self.username}`);
    return followedUser;
  }
};
