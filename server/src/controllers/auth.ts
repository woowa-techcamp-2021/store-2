import { Request, Response } from 'express';

import authService from 'services/auth';

import errorHandler from 'utils/error/error-handler';

interface IReqBody {
  id: string;
  password: string;
}

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, password } = req.body as IReqBody;

    const { accessToken, refreshToken } = await authService.signIn(id, password);

    res.cookie('_rt', refreshToken, { httpOnly: true });
    res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
