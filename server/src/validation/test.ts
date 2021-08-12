import { Request } from 'express';
import errorGenerator from 'utils/error/error-generator';

export const testValidation = (_req: Request): void => {
  // validation logic
  throw errorGenerator({
    code: 'errorHandlerErrCode',
    message: 'errorMsgForDev',
  });
};

export const lintValidation = (): void => {};
