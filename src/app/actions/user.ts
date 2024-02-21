'use server';

import { prisma } from '@/lib/db/prisma';
import { getSelfUser } from '@/lib/services/auth-service';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelfUser();
//   const validData = {
//     bio: values.bio,
//   };

  const user = await prisma.user.update({
    where: { id: self.id },
    data: { ...values },
  });

  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);

  return user;
};
