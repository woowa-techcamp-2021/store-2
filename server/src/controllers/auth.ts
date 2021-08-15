import { Request, Response } from 'express';

import authService from 'services/auth';

import errorHandler from 'utils/error/error-handler';
import { getAccessToken, getRefreshToken } from 'utils/jwt';

interface IReqBody {
  id: string;
  password: string;
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, password } = req.body as IReqBody;

    const { accessToken, refreshToken } = await authService.signIn(id, password);

    res.cookie('rteofkreensh', refreshToken, { httpOnly: true });
    res.status(200).json({ accessToken });
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

    const { newAccessToken, isAccessTokenExpired } = await authService.checkAuth(accessToken, refreshToken);

    if (redirect) {
      res.status(200).json({ requestAgain: true, newAccessToken });
      return;
    }

    const result = isAccessTokenExpired ? { newAccessToken } : {};
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.clearCookie('_rt');
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
