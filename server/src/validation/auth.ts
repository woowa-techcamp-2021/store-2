import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import errorGenerator from 'utils/error/error-generator';
import errorHandler from 'utils/error/error-handler';

import { USER } from 'config/constants';

export const authValidation = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      id: Joi.string()
        .min(USER.ID_MIN_LENGTH)
        .max(USER.ID_MAX_LENGTH)
        .required()
        .messages({
          'string.min': `아이디는 ${USER.ID_MIN_LENGTH}자 이상 입력해야 합니다`,
          'string.max': `아이디는 ${USER.ID_MAX_LENGTH}자를 넘길 수 없습니다`,
          'any.required': `아이디를 입력해주세요`,
        }),
      password: Joi.string()
        .max(USER.PASSWORD_MAX_LENGTH)
        .min(USER.PASSWORD_MIN_LENGTH)
        .required()
        .messages({
          'string.min': `비밀번호는 ${USER.PASSWORD_MIN_LENGTH}자 이상 입력해야 합니다`,
          'string.max': `비밀번호는 ${USER.PASSWORD_MAX_LENGTH}자를 넘길 수 없습니다`,
          'any.required': `비밀번호를 입력해주세요`,
        }),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      console.log(validationResult.error.message);
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
