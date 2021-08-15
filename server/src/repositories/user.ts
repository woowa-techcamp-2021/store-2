import { db } from 'models';
import { Model } from 'sequelize';

import { UserAttribures, UserCreationAttributes } from 'models/user';

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
