import { db } from 'models';
import { Model } from 'sequelize';

import { UserAttribures, UserCreationAttributes } from 'models/user';

import errorGenerator from 'utils/error/error-generator';

export const checkUserExists = async (user_id: string): Promise<void> => {
  const userCount = await db.User.count({
    where: {
      user_id,
    },
  });

  if (userCount > 0) {
    throw errorGenerator({
      message: 'POST /api/user - account already exists',
      code: 'auth/existing-user',
    });
  }
};

export const createUser = async (
  user_id: string,
  password: string,
): Promise<Model<UserAttribures, UserCreationAttributes>> => {
  const user = await db.User.create({
    user_id,
    password,
    provider: 'local',
  });

  return user;
};
