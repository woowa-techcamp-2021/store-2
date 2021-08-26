import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import errorGenerator from 'utils/error/error-generator';
import errorHandler from 'utils/error/error-handler';

import { REVIEW } from 'config/constants';
import { IReviewBody, IReviewQuery } from 'types/reviews';

export const postReviewValidation = (
  req: Request<unknown, unknown, IReviewBody>,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const schema = Joi.object({
      title: Joi.string()
        .max(REVIEW.TITLE_MAX_LENGTH)
        .min(REVIEW.TITLE_MIN_LENGTH)
        .required()
        .empty('')
        .messages({
          'any.required': '제목을 입력해주세요',
          'string.min': `제목은 ${REVIEW.TITLE_MIN_LENGTH}자 이상 입력해주세요`,
          'string.max': `제목은 ${REVIEW.TITLE_MAX_LENGTH}자를 넘지 않게해주세요`,
        }),
      contents: Joi.string()
        .min(REVIEW.CONTENTS_MIN_LENGTH)
        .required()
        .empty('')
        .messages({
          'string.min': `리뷰 내용은 ${REVIEW.CONTENTS_MIN_LENGTH}자 이상 입력해주세요`,
          'any.required': `리뷰 내용을 입력해주세요`,
        }),
      score: Joi.number()
        .integer()
        .max(REVIEW.MAX_SCORE)
        .min(REVIEW.MIN_SCORE)
        .required()
        .empty('')
        .messages({
          'number.min': `점수는 ${REVIEW.MIN_SCORE}점에서 ${REVIEW.MAX_SCORE}점 까지 입력가능합니다`,
          'number.max': `점수는 ${REVIEW.MIN_SCORE}점에서 ${REVIEW.MAX_SCORE}점 까지 입력가능합니다`,
          'any.required': `점수는 ${REVIEW.MIN_SCORE}점에서 ${REVIEW.MAX_SCORE}점 까지 입력가능합니다`,
          'number.integer': '소수 멈춰!',
        }),
      itemId: Joi.number().required().empty('').messages({
        'any.required': '잘못된 요청입니다',
      }),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      throw errorGenerator({
        message: 'validation/review - invalid request body',
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

export const getReviewsValidation = (
  req: Request<unknown, unknown, unknown, IReviewQuery>,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const schema = Joi.object({
      itemId: Joi.number().required().empty('').messages({
        'any.required': '잘못된 요청입니다',
      }),
      pageId: Joi.number().min(1).required().empty('').messages({
        'any.required': '잘못된 요청입니다',
        'number.min': '잘못된 요청입니다',
      }),
    });

    const validationResult = schema.validate(req.query);

    if (validationResult.error) {
      throw errorGenerator({
        message: 'validation/review - invalid request query',
        code: 'req/invalid-query',
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
