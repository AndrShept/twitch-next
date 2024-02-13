// import { getRecommended } from '@/lib/services/recommended-service';
import { getRecommended } from '@/app/(browse)/_components/sidebar/actions/get-recommended';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useTransition } from 'react';

// export const useRecommended = () =>
//   useQuery({
//     queryKey: ['recommended'],
//     queryFn: getRecommended,
//   });

export const useRecommendedNext = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    startTransition(async () => {
      const users = await getRecommended();
      if (!!users.length) {
        setData(users);
      }
      if (!users.length) {
        setError('Something went wrong');
      }
    });
  }, []);

  return {
    isPending,
    data,
    error,
  };
};
