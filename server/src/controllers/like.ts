import { Request, Response } from 'express';

import likeService from 'services/like';

import errorHandler from 'utils/error/error-handler';
import { getAccessToken, getUIDFromToken } from 'utils/jwt';

export const addLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = getUIDFromToken(getAccessToken(req.headers.authorization));
    const itemId = parseInt(req.params.id, 10);
    await likeService.addLike(uid, itemId);

    res.status(200).json();
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const deleteLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = getUIDFromToken(getAccessToken(req.headers.authorization));
    const itemId = parseInt(req.params.id, 10);
    await likeService.deleteLike(uid, itemId);

    res.status(200).json();
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
