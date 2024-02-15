'use server';

import { prisma } from '@/lib/db/prisma';
import { getSelfUser } from '@/lib/services/auth-service';
import { Stream } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const updateStream = async (values: Partial<Stream>) => {

  const { isChatDelayed, isChatEnabled, isChatFollowersOnly } = values;

  try {
    const self = await getSelfUser();
    const selfStream = await prisma.stream.findUnique({
      where: { userId: self.id },
    });
    if (!selfStream) {
      throw new Error('Stream not found');
    }

    const updatedStream = await prisma.stream.update({
      where: { id: selfStream.id },
      data: {
        isChatDelayed,
        isChatEnabled,
        isChatFollowersOnly,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return updatedStream;
  } catch (error) {
    throw new Error('Internal Error');
  }
};
