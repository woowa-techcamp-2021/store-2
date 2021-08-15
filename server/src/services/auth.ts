import { getUser } from 'repositories/auth';

import errorGenerator from 'utils/error/error-generator';
import { createToken } from 'utils/jwt';
import { checkPassword } from 'utils/crypto';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

async function signIn(user_id: string, password: string): Promise<IToken> {
  const userSnapshot = await getUser(user_id);

  const uid = userSnapshot.getDataValue('id');
  const passwordOnDB = userSnapshot.getDataValue('password');

  const isCorrectPassword = await checkPassword(password, passwordOnDB);

  if (!isCorrectPassword) {
    throw errorGenerator({
      message: 'POST /api/auth - wrong password',
      code: 'auth/wrong-password',
    });
  }

  const accessToken = createToken('access', { uid });
  const refreshToken = createToken('refresh', { uid });

  return { accessToken, refreshToken };
}

export default { signIn };
