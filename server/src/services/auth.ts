import fetch from 'node-fetch';

import { getUser } from 'repositories/auth';
import { checkUserExists, getUserId } from 'repositories/user';

import errorGenerator from 'utils/error/error-generator';
import { checkTokenExpiration, decodeToken, createToken } from 'utils/jwt';
import { checkPassword } from 'utils/crypto';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

interface ICheckAuth {
  isAccessTokenExpired: boolean;
  newAccessToken: string;
  userId: string;
}

interface IHandleGithubAuth {
  isUserExists: boolean;
  userId: string;
}

interface IGithubAccessToken {
  access_token: string;
}

interface IGithubId {
  login: string;
}

async function signIn(userId: string, isOAuth: boolean, password: string): Promise<IToken> {
  const userSnapshot = await getUser(userId);

  const uid = userSnapshot.getDataValue('id');

  if (!isOAuth) {
    const passwordOnDB = userSnapshot.getDataValue('password');

    const isCorrectPassword = await checkPassword(password, passwordOnDB);

    if (!isCorrectPassword) {
      throw errorGenerator({
        message: 'POST /api/auth - wrong password',
        code: 'auth/wrong-password',
      });
    }
  }

  const accessToken = createToken('access', { uid });
  const refreshToken = createToken('refresh', { uid });

  return { accessToken, refreshToken };
}

async function checkAuth(accessToken: string, refreshToken: string): Promise<ICheckAuth> {
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

  const userSnapshot = await getUserId(uid);

  const userId = userSnapshot.getDataValue('userId');

  return { newAccessToken, isAccessTokenExpired, userId };
}

const GITHUB_AT_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_IDL_URL = `https://api.github.com/user`;
const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';

async function handleGithubAuth(code: string): Promise<IHandleGithubAuth> {
  const query = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;
  const response = await fetch(`${GITHUB_AT_URL}?${query}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
  });

  const { access_token: githubAccessToken } = (await response.json()) as IGithubAccessToken;

  const responseId = await fetch(GITHUB_IDL_URL, {
    method: 'GET',
    headers: {
      accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${githubAccessToken}`,
    },
  });

  const { login: userId } = (await responseId.json()) as IGithubId;

  const isUserExists = await checkUserExists(userId);

  return { isUserExists, userId };
}

export default { signIn, checkAuth, handleGithubAuth };
