import { prisma } from '../db/prisma';
import { getSelfUser } from './auth-service';

export const getFollowedUsers = async () => {
  try {
    const self = await getSelfUser();

    const followedUsers = prisma.follow.findMany({
      where: {
        followingId: self.id,
      },
      include: {
        followingUser: {
          include: {
            stream: true,
          },
        },
        followedByUser: {
          include: {
            stream: true,
          },
        },
      },
      orderBy: [
        {
          followingUser: {
            stream: {
              isLive: 'desc',
            },
          },
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    return followedUsers;
  } catch {
    return [];
  }
};
