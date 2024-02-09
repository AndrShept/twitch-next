import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(users, { status: 200 });
};
