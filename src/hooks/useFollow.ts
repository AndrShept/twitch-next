import { getSelfUser } from '@/lib/services/auth-service';
import { useAuth } from '@clerk/nextjs';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { followUser } from '../app/actions/follow';

export const useFollow = (userId: string) => {
  const [isPending, startTransition] = useTransition();
  const { userId: id } = useAuth();

  const onFollow = async () => {
    if (!id) {
      return;
    }
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
