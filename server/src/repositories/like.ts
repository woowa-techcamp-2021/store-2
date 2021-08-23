import { db } from 'models';

export const createLike = async (userId: string, itemId: number): Promise<boolean> => {
  try {
    const createResult = await db.Like.create({
      UserId: userId,
      ItemId: itemId,
    });

    return createResult !== null;
  } catch (err) {
    return false;
  }
};

export const destroyLike = async (userId: string, itemId: number): Promise<boolean> => {
  try {
    const destroyResult = await db.Like.destroy({
      where: {
        UserId: userId,
        ItemId: itemId,
      },
    });

    return destroyResult === 1;
  } catch (err) {
    return false;
  }
};
