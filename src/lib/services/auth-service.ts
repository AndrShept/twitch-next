import { currentUser } from '@clerk/nextjs';

import { prisma } from '../db/prisma';

export const getSelfUser = async () => {
  const profile = await currentUser();
  if (!profile || !profile.username) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { externalUserId: profile.id },
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
