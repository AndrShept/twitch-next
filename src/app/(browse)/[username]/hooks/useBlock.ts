import { useTransition } from 'react';
import { toast } from 'sonner';

import { blockUser } from '../actions/block-service';

export const useBlock = (userId: string) => {
  const [isPending, startTransition] = useTransition();
  const onBlock = async () => {
    startTransition(async () => {
      const block = await blockUser(userId);
      if (block?.id) {
        toast.success(
          `Success blocking user ${block.blockingUserBy?.username}`,
        );
      }
    });
  };
  return {
    isPending,
    onBlock,
  };
};
