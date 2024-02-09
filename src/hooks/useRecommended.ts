import { getRecommended } from '@/lib/recommended-service';
import { useQuery } from '@tanstack/react-query';

export const useRecommended = () =>
  useQuery({
    queryKey: ['recommended'],
    queryFn: getRecommended,
  });
