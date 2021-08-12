import { db } from 'models';
import { Model } from 'sequelize';

import { UserAttribures, UserCreationAttributes } from 'models/user';

const createTestUser = async ({
  user_id,
  password,
  provider,
  phone,
}: UserCreationAttributes): Promise<
  Model<UserAttribures, UserCreationAttributes>
> =>
  db.User.create({
    user_id,
    password,
    provider,
    phone,
  });

export default createTestUser;
