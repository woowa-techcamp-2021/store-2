import { Request, Response } from 'express';

import searchService from 'services/search';

import errorHandler from 'utils/error/error-handler';

interface ReqQuery {
  keyword: string;
}

export const getKeywords = async (req: Request<unknown, unknown, unknown, ReqQuery>, res: Response): Promise<void> => {
  try {
    const { keyword } = req.query;
    const keywords = await searchService.getKeywords(keyword);
    res.status(200).json(keywords);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
