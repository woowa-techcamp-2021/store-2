import { Request, Response } from 'express';

import userService from 'services/user';

import errorHandler from 'utils/error/error-handler';

import { REFRESH_TOKEN_NAME } from 'config/constants';

interface ReqBody {
  id: string;
  password: string;
}

export const signUp = async (req: Request<unknown, unknown, ReqBody>, res: Response): Promise<void> => {
  try {
    const { id, password } = req.body;

    const { accessToken, refreshToken, userId } = await userService.signUp(id, false, password);

    res.cookie(REFRESH_TOKEN_NAME, refreshToken, { httpOnly: true });
    res.status(201).json({ accessToken, userId });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
