import { checkUserExists, createUser } from 'repositories/user';

import { createToken } from 'utils/jwt';
import { hashPassword } from 'utils/crypto';
import errorGenerator from 'utils/error/error-generator';

interface ISignUp {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

async function signUp(user_id: string, isOAuth: boolean, password: string): Promise<ISignUp> {
  const isUserExists = await checkUserExists(user_id);

  if (isUserExists) {
    throw errorGenerator({
      message: 'POST /api/user - account already exists',
      code: 'auth/existing-user',
    });
  }

  const hashedPassword = await hashPassword(password);

  const provider = isOAuth ? 'github' : 'local';
  const passwordOnDB = isOAuth ? undefined : hashedPassword;
  const createUserArgs = {
    user_id,
    provider,
    password: passwordOnDB,
  };

  const user = await createUser(createUserArgs);

  const uid = user.getDataValue('id');
  const userId = user.getDataValue('user_id');

  const accessToken = createToken('access', { uid });
  const refreshToken = createToken('refresh', { uid });

  return { accessToken, refreshToken, userId };
}

export default { signUp };
