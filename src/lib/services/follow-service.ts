import { prisma } from '../db/prisma';
import { getSelfUser } from './auth-service';

export const isExistingUser = async (userId: string) => {
  const self = await getSelfUser();

  const userExist = await prisma.follow.findFirst({
    where: { followerId: userId, followingId: self.id },
  });
  if (!!userExist) {
    return true;
  } else {
    false;
  }
};
