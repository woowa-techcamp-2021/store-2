import { createTestUser } from 'repositories/test';

export const testService = async (data: any) => {
  // data processing
  const processedData = data;
  const result: any = await createTestUser({
    user_id: 'test_user_id',
    password: 'test_password',
    provider: 'test_provider',
    phone: 'test_phone',
  });

  return result;
};
