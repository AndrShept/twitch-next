import { getChat } from '@/app/actions/chat';
import { ReceivedChatMessage } from '@livekit/components-react';
import { Chat } from '@prisma/client';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface useGetChatProps {
  streamId: string;
  messages: ReceivedChatMessage[];
}

export const useGetChat = ({ messages, streamId }: useGetChatProps) => {
  const [data, setData] = useState<Chat[]>([]);
  const [isPending, startTransition] = useTransition();

  const mergeMessages = [
    ...data,
    ...messages.map((message: ReceivedChatMessage) => {
      return {
        id: uuidv4(),
        content: message.message,
        userId: message.from?.identity.replace('host-', '') || '',
        streamId,
        username: message.from?.name || '',
        createdAt: new Date(message.timestamp),
        updatedAt: new Date(message.timestamp),
      };
    }),
  ];

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getChat(streamId);

        setData(res);
      } catch (error) {
        toast.error(`Something went wrong ${error}`);
      }
    });
  }, [streamId]);

  return { isPending, mergeMessages };
};
