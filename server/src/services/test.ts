import createTestUser from 'repositories/test';
import { Model } from 'sequelize';
import { UserAttribures, UserCreationAttributes } from 'models/user';

const testService = async (): Promise<
  Model<UserAttribures, UserCreationAttributes>
> => {
  const result = await createTestUser({
    user_id: 'test_user_id',
    password: 'test_password',
    provider: 'test_provider',
    phone: 'test_phone',
  });

  return result;
};

export default testService;
