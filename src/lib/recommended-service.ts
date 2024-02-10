import { User } from '@prisma/client';

export const getRecommended = async (): Promise<User[]> => {
  const res = await fetch('/api/recommended');
  return res.json();
};
