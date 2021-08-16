import { Request, Response } from 'express';

import authService from 'services/auth';
import userService from 'services/user';

import errorHandler from 'utils/error/error-handler';
import { getAccessToken, getRefreshToken } from 'utils/jwt';

import { REFRESH_TOKEN_NAME } from 'config/constants';

interface IReqBody {
  id: string;
  password: string;
}

interface IGithub {
  code: string;
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, password } = req.body as IReqBody;

    const { accessToken, refreshToken } = await authService.signIn(id, false, password);

    res.cookie(REFRESH_TOKEN_NAME, refreshToken, { httpOnly: true });
    res.status(200).json({ accessToken, userId: id });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { redirect } = req.query;

    const accessToken = getAccessToken(req.headers.authorization);
    const refreshToken = getRefreshToken(req.cookies);

    const { newAccessToken, isAccessTokenExpired, userId } = await authService.checkAuth(accessToken, refreshToken);

    if (redirect) {
      res.status(200).json({ requestAgain: true, newAccessToken });
      return;
    }

    const result = isAccessTokenExpired ? { newAccessToken, userId } : { newAccessToken: '', userId };
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.clearCookie(REFRESH_TOKEN_NAME);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

const GITHUB_LOGIN_URL = 'https://github.com/login/oauth/authorize';
const CLIENT_ID = process.env.CLIENT_ID || '';
const REDIRECT_URL = process.env.REDIRECT_URL || '';

export const signInGithub = (req: Request, res: Response): void => {
  const url = `${GITHUB_LOGIN_URL}?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}&scope=read:user`;

  res.status(200).json({ url });
};

export const handleGithubAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.body as IGithub;

    const { isUserExists, userId } = await authService.handleGithubAuth(code);

    if (isUserExists) {
      const { accessToken, refreshToken } = await authService.signIn(userId, true, '');
      res.cookie(REFRESH_TOKEN_NAME, refreshToken, { httpOnly: true });
      res.status(200).json({ accessToken });
      return;
    }

    const { accessToken, refreshToken } = await userService.signUp(userId, true, '');
    res.cookie(REFRESH_TOKEN_NAME, refreshToken, { httpOnly: true });
    res.status(200).json({ accessToken, userId });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const signOut = (req: Request, res: Response): void => {
  res.clearCookie(REFRESH_TOKEN_NAME);
  res.status(200).json({});
};
