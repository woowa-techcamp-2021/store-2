import { Request, Response } from 'express';

import reviewService from 'services/reviews';

import errorHandler from 'utils/error/error-handler';
import { decodeToken, getAccessToken } from 'utils/jwt';

import { IReviewBody } from 'types/reviews';

export const postReview = async (req: Request<unknown, unknown, IReviewBody>, res: Response): Promise<void> => {
  try {
    const { title, itemId, contents, score } = req.body;
    const image = req.file;
    const token = getAccessToken(req.headers.authorization);
    const { uid } = decodeToken('access', token);

    await reviewService.postReview(uid, itemId, title, contents, score, image);
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
