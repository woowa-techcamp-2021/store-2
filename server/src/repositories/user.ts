import { db } from 'models';
import { Model } from 'sequelize';

import { UserAttribures, UserCreationAttributes } from 'models/user';

import errorGenerator from 'utils/error/error-generator';

export const checkUserExists = async (userId: string): Promise<boolean> => {
  const userCount = await db.User.count({
    where: {
      userId,
    },
  });

  return !!userCount;
};

export const createUser = async ({
  userId,
  provider,
  password,
}: UserCreationAttributes): Promise<Model<UserAttribures, UserCreationAttributes>> => {
  const user = await db.User.create({
    userId,
    provider,
    password,
  });

  return user;
};

export const getUserId = async (uid: string): Promise<Model<UserAttribures, UserCreationAttributes>> => {
  const userSnapshot = await db.User.findOne({
    attributes: ['userId'],
    where: {
      id: uid,
    },
  });

  if (!userSnapshot) {
    throw errorGenerator({
      message: 'POST /api/auth - account not found',
      code: 'auth/account-not-found',
    });
  }

  return userSnapshot;
};
