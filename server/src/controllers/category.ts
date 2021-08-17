import { Request, Response } from 'express';

import categoryService from 'services/category';

import errorHandler from 'utils/error/error-handler';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.getCategories();

    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
