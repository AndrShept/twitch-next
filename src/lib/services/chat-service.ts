import { prisma } from '../db/prisma';

export const getChat = async (streamId: string) => {
  if (!streamId) {
    throw new Error('streamId not found');
  }

  const chats = await prisma.chat.findMany({
    where: { streamId },
  });
  return chats;
};
