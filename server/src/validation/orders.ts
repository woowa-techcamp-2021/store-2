import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import errorGenerator from 'utils/error/error-generator';
import errorHandler from 'utils/error/error-handler';

import { ORDER } from 'config/constants';

import { PostOrderReqBody } from 'controllers/orders';

interface IQuery {
  pageId: number;
  prevDate: string;
  currentDate: string;
}

export const getOrdersValidation = (
  req: Request<unknown, unknown, unknown, IQuery>,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const schema = Joi.object({
      pageId: Joi.number().required().messages({
        'number.required': '페이지 아이디가 없습니다.',
      }),
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

    const validationResult = schema.validate(req.query);

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

export const postOrderValidation = (
  req: Request<unknown, unknown, PostOrderReqBody, unknown>,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const schema = Joi.object({
      user: Joi.string().required().empty('').messages({
        'any.required': '주문하시는 분을 입력해주세요',
      }),
      phone: Joi.string()
        .required()
        .pattern(/^010\d{4}\d{4}$/)
        .empty('')
        .messages({
          'any.required': '전화번호를 입력해주세요',
          'string.pattern.base': '전화번호 형식을 확인해주세요',
        }),
      receiver: Joi.string()
        .required()
        .empty('')
        .max(ORDER.RECEIVER_MAX_LENGTH)
        .messages({
          'any.required': '받는분을 입력해주세요',
          'string.max': `받는 분은 ${ORDER.RECEIVER_MAX_LENGTH}자 이하로 입력해주세요`,
        }),
      address: Joi.string()
        .required()
        .max(ORDER.ADDRESS_MAX_LENGTH)
        .min(ORDER.ADDRESS_MIN_LENGTH)
        .empty('')
        .messages({
          'any.required': '주소를 입력해주세요',
          'string.min': `주소는 ${ORDER.ADDRESS_MIN_LENGTH}자 이상 입력해주세요`,
          'string.max': `주소는 ${ORDER.ADDRESS_MAX_LENGTH}자 이하로 입력해주세요`,
        }),
      itemId: Joi.string().required().empty('').messages({
        'any.required': '잘못된 요청입니다',
      }),
      quantity: Joi.number().required().empty('').min(ORDER.QUANTITY_MIN).integer().messages({
        'any.required': '잘못된 요청입니다',
        'number.base': '숫자만 입력가능합니다',
        'number.min': '1개 이상만 구매할 수 있습니다',
        'number.integer': '소수는 멈춰!',
      }),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      throw errorGenerator({
        message: 'validation/post-order - invalid request body',
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
