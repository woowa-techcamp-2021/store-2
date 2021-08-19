import { Request, Response } from 'express';

import searchService from 'services/search';

import errorHandler from 'utils/error/error-handler';

export const getKeywords = async (req: Request, res: Response): Promise<void> => {
  try {
    const keywords = await searchService.getKeywords(req);
    res.status(200).json(keywords);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
