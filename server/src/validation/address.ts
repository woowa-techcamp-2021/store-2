import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ADDRESS } from 'config/constants';

import errorGenerator from 'utils/error/error-generator';
import errorHandler from 'utils/error/error-handler';

import { IAddReqBody, IRemoveReqBody } from 'types/address';

export const addAddressValidation = (
  req: Request<unknown, unknown, IAddReqBody>,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const schema = Joi.object({
      name: Joi.string()
        .min(ADDRESS.NAME_MIN_LENGTH)
        .max(ADDRESS.NAME_MAX_LENGTH)
        .required()
        .empty('')
        .messages({
          'string.min': `이름은 ${ADDRESS.NAME_MIN_LENGTH}자 이상 입력해야 합니다.`,
          'string.max': `이름은 ${ADDRESS.NAME_MAX_LENGTH}자를 넘길 수 없습니다.`,
          'any.required': '이름을 입력해주세요.',
        }),
      receiver: Joi.string()
        .min(ADDRESS.RECEIVER_MIN_LENGTH)
        .max(ADDRESS.RECEIVER_MAX_LENGTH)
        .required()
        .empty('')
        .messages({
          'string.min': `받는분은 ${ADDRESS.RECEIVER_MIN_LENGTH}자 이상 입력해야 합니다.`,
          'string.max': `받는분은 ${ADDRESS.RECEIVER_MIN_LENGTH}자를 넘길 수 없습니다.`,
          'any.required': `받는분을 입력해주세요.`,
        }),
      address: Joi.string()
        .min(ADDRESS.ADDRESS_MIN_LENGTH)
        .max(ADDRESS.ADDRESS_MAX_LENGTH)
        .required()
        .empty('')
        .messages({
          'string.min': `주소는 ${ADDRESS.ADDRESS_MIN_LENGTH}자 이상 입력해야 합니다.`,
          'string.max': `주소는 ${ADDRESS.ADDRESS_MAX_LENGTH}자를 넘길 수 없습니다.`,
          'any.required': `주소를 입력해주세요.`,
        }),
      addressDetail: Joi.string()
        .min(ADDRESS.ADDRESS_MIN_LENGTH)
        .max(ADDRESS.ADDRESS_MAX_LENGTH)
        .required()
        .empty('')
        .messages({
          'string.min': `상세주소는 ${ADDRESS.ADDRESS_MIN_LENGTH}자 이상 입력해야 합니다.`,
          'string.max': `상세주소는 ${ADDRESS.ADDRESS_MAX_LENGTH}자를 넘길 수 없습니다.`,
          'any.required': `상세주소를 입력해주세요.`,
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
  req: Request<unknown, unknown, IRemoveReqBody>,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const schema = Joi.object({
      id: Joi.number().min(1).required().empty('').messages({
        'any.required': '아이디를 입력해주세요.',
      }),
    });

    const validationResult = schema.validate(req.body.data);

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
