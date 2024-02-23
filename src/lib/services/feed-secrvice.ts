import { currentUser } from '@clerk/nextjs';

import { prisma } from '../db/prisma';

export const getStream = async (term?: string) => {

  const self = await currentUser();
  if (self) {
    const streams = await prisma.stream.findMany({
      where: {
        OR: [
          {
            name: { contains: term },
            user: { username: { contains: term } },
          },
        ],
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
    where: {
      OR: [
        {
          name: { contains: term },
          user: { username: { contains: term } },
        },
      ],
    },
    include: { user: true },
    orderBy: [{ isLive: 'desc' }, { createdAt: 'desc' }],
  });
  return streams;
};
