import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

import errorGenerator from 'utils/error/error-generator';

interface OptionType {
  uid: string;
}

type TokenType = 'access' | 'refresh';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';

export const createToken = (type: TokenType, option: OptionType): string => {
  const ACCESS_TOKEN_EXPIRE_DATE = Math.floor(Date.now() / 1000) + 60 * 30;
  const REFRESH_TOKEN_EXPIRE_DATE =
    Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;

  const expireDate =
    type === 'access' ? ACCESS_TOKEN_EXPIRE_DATE : REFRESH_TOKEN_EXPIRE_DATE;
  const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

  const token = jwt.sign(
    {
      exp: expireDate,
      ...option,
    },
    secret,
  );

  return token;
};

export const decodeToken = (type: TokenType, token: string): JwtPayload => {
  const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  const decoded = jwt.verify(token, secret);

  if (typeof decoded === 'string') {
    throw errorGenerator({
      code: 'auth/invalid-token',
      message: 'Invalid token',
    });
  }

  return decoded;
};

export const verifyToken = (
  type: TokenType,
  token: string,
  errCallback: (err: VerifyErrors | null) => void,
): void => {
  const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  jwt.verify(token, secret, err => {
    errCallback(err);
  });
};

export const getAccessToken = (authorization: string | void): string => {
  if (!authorization) return '';
  return authorization.split('Bearer ')[1];
};

export const checkTokenExpiration = (
  type: TokenType,
  token: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const secret =
      type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
    jwt.verify(token, secret, (err: VerifyErrors | null) => {
      if (err?.name === 'TokenExpiredError') {
        resolve(true);
      }
      if (err) {
        const error = errorGenerator({
          code: 'auth/invalid-token',
          message: 'Invalid token',
        });
        reject(error);
      }
      resolve(false);
    });
  });
};

export const getUIDFromToken = (token: string): string => {
  const decoded = jwt.decode(token);

  if (typeof decoded === 'string') {
    throw errorGenerator({
      code: 'auth/invalid-token',
      message: 'Invalid token',
    });
  }

  const uid = decoded?.uid;
  return uid;
};

export const checkTokenValidity = (
  type: TokenType,
  token: string,
): Promise<boolean> => {
  return new Promise(resolve => {
    const secret =
      type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
    jwt.verify(token, secret, (err: VerifyErrors | null) => {
      if (!err) {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
};
