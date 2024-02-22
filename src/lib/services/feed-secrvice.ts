import { currentUser } from '@clerk/nextjs';

import { prisma } from '../db/prisma';

export const getStream = async () => {
  const self = await currentUser();
  if (self) {
    const streams = await prisma.stream.findMany({
      where: {
        user: { NOT: { blockUser: { some: { blockingUserById: self.id } } } },
      },
      include: { user: true },
      orderBy: [
        {
          isLive: 'desc',
        },
        { createdAt: 'desc' },
      ],
    });
    return streams;
  }

  const streams = await prisma.stream.findMany({
    include: { user: true },
    orderBy: [{ isLive: 'desc' }, { createdAt: 'desc' }],
  });
  return streams;
};
