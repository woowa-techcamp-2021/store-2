import { Request, Response } from 'express';

import userService from 'services/user';

import errorHandler from 'utils/error/error-handler';

interface IReqBody {
  id: string;
  password: string;
}

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, password } = req.body as IReqBody;

    const { accessToken, refreshToken } = await userService.signUp(id, password);

    res.cookie('_rt', refreshToken, { httpOnly: true });
    res.status(201).json({ accessToken });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
