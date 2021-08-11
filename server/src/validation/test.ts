import { Request } from 'express';
import errorGenerator from 'utils/error/error-generator';

export const testValidation = (req: Request) => {
  // validation logic
  throw errorGenerator({
    code: 'errorHandlerErrCode',
    message: 'errorMsgForDev',
  });
};
