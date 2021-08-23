import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import errorGenerator from 'utils/error/error-generator';
import errorHandler from 'utils/error/error-handler';

interface IQuery {
  pageId: number;
}

interface IReqBody {
  prevDate: string;
  currentDate: string;
}

export const ordersValidation = (
  req: Request<unknown, unknown, IReqBody, IQuery>,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const schema = Joi.object({
      prevDate: Joi.string().min(10).max(10).required().messages({
        'string.min': `올바르지 않은 형식입니다`,
        'string.max': `올바르지 않은 형식입니다`,
        'any.required': `이전 날짜가 없습니다`,
      }),
      currentDate: Joi.string().max(10).min(10).required().messages({
        'string.min': `올바르지 않은 형식입니다`,
        'string.max': `올바르지 않은 형식입니다`,
        'any.required': `현재 날짜가 없습니다`,
      }),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      throw errorGenerator({
        message: 'validation/auth - invalid request body',
        code: 'req/invalid-body',
        customMessage: validationResult.error.message,
      });
    }

    next();
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
