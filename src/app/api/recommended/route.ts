import { prisma } from '@/lib/db/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const self = await currentUser();

  if (!self) {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(users, { status: 200 });
  }
  const users = await prisma.user.findMany({
    where: { NOT: { externalUserId: self.id } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(users, { status: 200 });
};
