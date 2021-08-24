import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ADDRESS } from 'config/constants';

import errorGenerator from 'utils/error/error-generator';
import errorHandler from 'utils/error/error-handler';

interface IAddReqBody {
  name: string;
  receiver: string;
  address: string;
}

interface IRemoveReqBody {
  id: string;
}

export const addAddressValidation = (
  req: Request<unknown, unknown, IAddReqBody, unknown>,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const schema = Joi.object({
      name: Joi.string()
        .min(ADDRESS.NAME_MIN_LENGTH)
        .max(ADDRESS.NAME_MAX_LENGTH)
        .required()
        .messages({
          'string.max': `이름은 ${ADDRESS.NAME_MIN_LENGTH}자 이상 입력해야 합니다.`,
          'string.min': `이름은 ${ADDRESS.NAME_MAX_LENGTH}자를 넘길 수 없습니다.`,
          'any.required': '이름을 입력해주세요.',
        }),
      receiver: Joi.string()
        .min(ADDRESS.RECEIVER_MIN_LENGTH)
        .max(ADDRESS.RECEIVER_MAX_LENGTH)
        .required()
        .messages({
          'string.max': `받는분은 ${ADDRESS.RECEIVER_MIN_LENGTH}자 이상 입력해야 합니다.`,
          'string.min': `받는분은 ${ADDRESS.RECEIVER_MIN_LENGTH}자를 넘길 수 없습니다.`,
          'any.required': `받는분을 입력해주세요.`,
        }),
      address: Joi.string()
        .max(ADDRESS.ADDRESS_MIN_LENGTH)
        .min(ADDRESS.ADDRESS_MAX_LENGTH)
        .required()
        .messages({
          'string.max': `주소는 ${ADDRESS.ADDRESS_MIN_LENGTH}자 이상 입력해야 합니다.`,
          'string.min': `주소는 ${ADDRESS.ADDRESS_MAX_LENGTH}자를 넘길 수 없습니다.`,
          'any.required': `주소를 입력해주세요.`,
        }),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      throw errorGenerator({
        message: 'validation/address - invalid request body',
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

export const removeAddressValidation = (
  req: Request<unknown, unknown, IRemoveReqBody, unknown>,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const schema = Joi.object({
      id: Joi.number().min(1).required().messages({
        'any.required': '아이디를 입력해주세요.',
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
