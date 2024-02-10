import { getProfile } from '@/lib/auth-service';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const profile = await currentUser();

  if (!profile) {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(users, { status: 200 });
  }
  const users = await prisma.user.findMany({
    where: { NOT: { externalUserId: profile.id } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(users, { status: 200 });
};
