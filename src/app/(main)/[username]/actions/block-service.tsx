'use server';

import { prisma } from '@/lib/db/prisma';
import { getSelfUser } from '@/lib/services/auth-service';
import { revalidatePath } from 'next/cache';

export const isBlockingUser = async (userId: string) => {
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
    const existingBlock = await prisma.block.findFirst({
      where: { blockUserId: self.id, blockingUserById: userId },
    });
    if (existingBlock) {
      return true;
    } else {
      false;
    }
  } catch (error) {
    return false;
  }
};
export const blockUser = async (id: string) => {
  const self = await getSelfUser();
  const otherUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error('User not found');
  }

  if (otherUser.id === self.id) {
    throw new Error('Cannot block yourself');
  }

  const existingBlock = await prisma.block.findFirst({
    where: { blockUserId: self.id, blockingUserById: otherUser.id },
  });
  if (existingBlock) {
    await prisma.block.deleteMany({
      where: { blockUserId: self.id, blockingUserById: otherUser.id },
    });
    revalidatePath(`/${self.username}`);
  } else {
    const BlockedUser = await prisma.block.create({
      data: { blockUserId: self.id, blockingUserById: otherUser.id },
      include: { blockingUserBy: true, blockUser: true },
    });

    revalidatePath(`/${self.username}`);
    return BlockedUser;
  }
};
