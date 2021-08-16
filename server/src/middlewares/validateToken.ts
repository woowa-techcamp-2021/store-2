import { Request, Response, NextFunction } from 'express';

import { getAccessToken, getRefreshToken, checkTokenExpiration } from 'utils/jwt';
import errorGenerator from 'utils/error/error-generator';
import errorHandler from 'utils/error/error-handler';

async function validateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const accessToken = getAccessToken(req.headers.authorization);
    const refreshToken = getRefreshToken(req.cookies);

    if (!accessToken || !refreshToken) {
      throw errorGenerator({
        message: 'No token',
        code: 'req/no-token',
      });
    }

    const isTokenExpired = await checkTokenExpiration('access', accessToken);

    if (isTokenExpired) {
      res.redirect(303, '/api/auth?redirect=true');
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
}

export default validateToken;
