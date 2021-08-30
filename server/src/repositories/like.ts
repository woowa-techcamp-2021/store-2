import { db } from 'models';

import errorGenerator from 'utils/error/error-generator';

export const createLike = async (userId: string, itemId: number): Promise<void> => {
  const createResult = await db.Like.create({
    UserId: userId,
    ItemId: itemId,
  });

  if (!createResult) {
    throw errorGenerator({
      message: 'POST /api/likes - create failed',
      code: 'likes/fail-to-create',
    });
  }
};

export const destroyLike = async (userId: string, itemId: number): Promise<void> => {
  const destroyResult = await db.Like.destroy({
    where: {
      UserId: userId,
      ItemId: itemId,
    },
  });

  if (destroyResult !== 1) {
    throw errorGenerator({
      message: 'DELETE /api/likes - delete failed',
      code: 'likes/fail-to-delete',
    });
  }
};

export const findIsUserLikeItem = async (userId: string, itemId: number): Promise<boolean> => {
  const result = await db.Like.findOne({
    where: {
      UserId: userId,
      ItemId: itemId,
    },
  });

  return !!result;
};
