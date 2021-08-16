import { getUser } from 'repositories/auth';

import errorGenerator from 'utils/error/error-generator';
import { checkTokenExpiration, decodeToken, createToken } from 'utils/jwt';
import { checkPassword } from 'utils/crypto';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

interface Ic {
  isAccessTokenExpired: boolean;
  newAccessToken: string;
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

async function checkAuth(accessToken: string, refreshToken: string): Promise<Ic> {
  if (!accessToken || !refreshToken) {
    throw errorGenerator({
      message: 'GET /api/auth - no token',
      code: 'req/no-token',
    });
  }

  const isAccessTokenExpired = await checkTokenExpiration('access', accessToken);
  const isRefreshTokenExpired = await checkTokenExpiration('refresh', refreshToken);

  if (isAccessTokenExpired && isRefreshTokenExpired) {
    throw errorGenerator({
      code: 'auth/token-expired',
      message: 'All tokens have expired',
    });
  }

  const { uid } = decodeToken('refresh', refreshToken) as { uid: string };
  const newAccessToken = createToken('access', { uid });

  return { newAccessToken, isAccessTokenExpired };
}

export default { signIn, checkAuth };
