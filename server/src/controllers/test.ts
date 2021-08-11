import { Request, Response } from 'express';

import { testService } from 'services/test';
import { testValidation } from 'validation/test';

import errorHandler from 'utils/error/error-handler';

export const getTest = async (req: Request, res: Response) => {
  try {
    testValidation(req);
    const testData = await testService(req.body);
    res.status(200).json(testData);
  } catch (err) {
    const { statusCode, errorMessage } = errorHandler(err.code);
    res.status(statusCode).json(errorMessage);
  }
};
