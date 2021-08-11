import { db } from 'models';

import { UserCreationAttributes } from 'models/user';

export const createTestUser = async ({
  user_id,
  password,
  provider,
  phone,
}: UserCreationAttributes) =>
  await db.User.create({
    user_id,
    password,
    provider,
    phone,
  });
