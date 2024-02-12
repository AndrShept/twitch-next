import { useTransition } from 'react';
import { toast } from 'sonner';

import { followUser } from '../actions/follow-service';

export const useFollow = (userId: string) => {
  const [isPending, startTransition] = useTransition();
  const onFollow = async () => {
    startTransition(async () => {
      const follow = await followUser(userId);

      if (follow?.followingUser) {
        toast.success(
          `Success added new follow ${follow?.followingUser?.username}`,
        );
      }
    });
  };
  return {
    isPending,
    onFollow,
  };
};
