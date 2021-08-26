import { Request, Response } from 'express';

import likeService from 'services/like';

import errorHandler from 'utils/error/error-handler';
import errorGenerator from 'utils/error/error-generator';
import { getAccessToken, getUIDFromToken } from 'utils/jwt';

export const addLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = getUIDFromToken(getAccessToken(req.headers.authorization));
    const itemId = parseInt(req.params.id, 10);
    const success = await likeService.addLike(uid, itemId);

    if (success) res.status(200).json('create like success');
    else {
      throw errorGenerator({
        message: 'POST /api/likes - create failed',
        code: 'likes/no-create',
      });
    }
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
    const success = await likeService.deleteLike(uid, itemId);

    if (success) res.status(200).json('delete like success');
    else {
      throw errorGenerator({
        message: 'DELETE /api/likes - delete failed',
        code: 'likes/no-delete',
      });
    }
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
