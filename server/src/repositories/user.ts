import { db } from 'models';
import { Model } from 'sequelize';

import { UserAttribures, UserCreationAttributes } from 'models/user';

import errorGenerator from 'utils/error/error-generator';

export const checkUserExists = async (user_id: string): Promise<boolean> => {
  const userCount = await db.User.count({
    where: {
      user_id,
    },
  });

  return !!userCount;
};

export const createUser = async ({
  user_id,
  provider,
  password,
}: UserCreationAttributes): Promise<Model<UserAttribures, UserCreationAttributes>> => {
  const user = await db.User.create({
    user_id,
    provider,
    password,
  });

  return user;
};

export const getUserId = async (uid: string): Promise<Model<UserAttribures, UserCreationAttributes>> => {
  const userSnapshot = await db.User.findOne({
    attributes: ['user_id'],
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
