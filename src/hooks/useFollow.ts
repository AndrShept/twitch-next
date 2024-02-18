import { useTransition } from 'react';
import { toast } from 'sonner';

import { followUser } from '../app/actions/follow';

export const useFollow = (userId: string) => {
  const [isPending, startTransition] = useTransition();
  const onFollow = async () => {
    startTransition(async () => {
      const follow = await followUser(userId);

      if (follow?.followingId) {
        toast.success(
          `Success added new follow ${follow?.followedByUser?.username}`,
        );
      }
    });
  };
  return {
    isPending,
    onFollow,
  };
};
