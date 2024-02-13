'use server'
import { prisma } from '@/lib/db/prisma';
import { getSelfUser } from '@/lib/services/auth-service';

export const getRecommended = async () => {

  const self = await getSelfUser();

  if (!self) {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users;
  }
  const users = await prisma.user.findMany({
    where: { NOT: { id: self.id } },
    orderBy: { createdAt: 'desc' },
  });

  return users;
};
