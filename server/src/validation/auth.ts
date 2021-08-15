import { Request, Response, NextFunction } from 'express';

import errorGenerator from 'utils/error/error-generator';
import errorHandler from 'utils/error/error-handler';

interface IReqBody {
  id: string;
  password: string;
}

export const signInValidateion = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id, password } = req.body as IReqBody;

    if (!id || !password) {
      throw errorGenerator({
        message: 'POST /api/auth - invalid body',
        code: 'req/invalid-body',
      });
    }

    next();
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
