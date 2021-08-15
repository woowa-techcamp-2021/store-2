import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import errorGenerator from 'utils/error/error-generator';
import errorHandler from 'utils/error/error-handler';

import { USER } from 'config/constants';

export const signInValidateion = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      id: Joi.string().min(USER.ID_MIN_LENGTH).max(USER.ID_MAX_LENGTH).required(),
      password: Joi.string().max(USER.PASSWORD_MAX_LENGTH).min(USER.PASSWORD_MIN_LENGTH).required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
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
