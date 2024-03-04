'use server';

import { prisma } from '@/lib/db/prisma';
import { Chat } from '@prisma/client';

export const addMessage = async (msg: Partial<Chat>) => {
  if (!msg.content || !msg || !msg.userId) {
    throw new Error('No message');
  }
  const userId = msg.userId.replace('host-', '');
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (user) {
    const newMsg = await prisma.chat.create({
      data: {
        content: msg.content,
        userId: userId,
        streamId: msg.streamId,
        username: msg.username,
      },
    });
    return newMsg;
  }
  const newGuestUserMsg = await prisma.chat.create({
    data: {
      content: msg.content,
      streamId: msg.streamId,
      username: msg.username,
    },
  });
  return newGuestUserMsg;
};

export const getChat = async (streamId: string) => {
  if (!streamId) {
    throw new Error('Stream Id not found');
  }
  const chats = await prisma.chat.findMany({
    where: {
      streamId,
    },
  });
  return chats;
};
