import { prisma } from '../db/prisma';
import { getSelfUser } from './auth-service';

export const getFollowedUsers = async () => {
  try {
    const self = await getSelfUser();

    const followedUsers = prisma.follow.findMany({
      where: {
        followedById: self.id,
        followingUser: {
          blockUser: {
            none: {
              blockUserId: self.id,
            },
          },
        },
      },
      include: {
        followingUser: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
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
