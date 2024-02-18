'use server';

import { prisma } from '@/lib/db/prisma';
import { getSelfUser } from '@/lib/services/auth-service';
import { currentUser } from '@clerk/nextjs';

export const getRecommended = async () => {
  const self = await currentUser();

  if (!self) {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: { stream: true },
    });

    return users;
  }
  const users = await prisma.user.findMany({
    where: { NOT: { externalUserId: self.id } },
    orderBy: { createdAt: 'desc' },
    include: { stream: true },
  });

  return users;
};
