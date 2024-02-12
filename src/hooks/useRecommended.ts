import { getRecommended } from '@/lib/services/recommended-service';
import { useQuery } from '@tanstack/react-query';

export const useRecommended = () =>
  useQuery({
    queryKey: ['recommended'],
    queryFn: getRecommended,
  });
