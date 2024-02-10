import { currentUser } from '@clerk/nextjs';

import { prisma } from './prisma';

export const getUser = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: { username },
  });
  return user;
};

export const createUser = async () => {
  const profile = await currentUser();
  const self = await prisma.user.findUnique({
    where: { externalUserId: profile?.id },
  });
  if (profile && !self) {
    const newUser = await prisma.user.create({
      data: {
        externalUserId: profile.id,
        imageUrl: profile.imageUrl,
        username:
          profile.username ||
          `${profile.firstName}${profile.lastName}` ||
          profile.emailAddresses[0].emailAddress,
      },
    });
    return newUser;
  }
  return
};
