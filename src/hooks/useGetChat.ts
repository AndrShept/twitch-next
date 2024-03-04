import { getChat } from '@/app/actions/chat';
import { Chat, User } from '@prisma/client';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

export const useGetChat = (streamId: string) => {
  const [data, setData] = useState<Chat[]>([]);
  const [isPending, startTransition] = useTransition();

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

  return { data, isPending };
};
