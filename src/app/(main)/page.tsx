import { prisma } from '@/lib/db/prisma';
import { createUser } from '@/lib/services/user-service';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { userAgent } from 'next/server';
import { Suspense } from 'react';

import { StreamList, StreamListSkeleton } from './_components/StreamList';

export default async function Home() {
  const self = await currentUser();
  // if (!self) {
  //   redirect('/sign-up');
  // }
  const user = await prisma.user.findFirst({
    where: { externalUserId: self?.id },
  });
  if (!user) {
    const res = await createUser();
    console.log(res);
    console.log('GO!!!');
  }



  return (
    <div className="h-full md:p-6 p-4 mx-auto   ">
      <StreamList />
    </div>
  );
}
