import { Request, Response } from 'express';

import itemService from 'services/items';

import errorHandler from 'utils/error/error-handler';

type IRequest = Request<unknown, unknown, unknown, { categoryId: string; type: string; pageId: number }>;

export const getMainItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const [popularItems, newItems, recommendItems] = await itemService.mainItems();
    res.status(200).json({ popularItems, newItems, recommendItems });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const getCategoryItems = async (req: IRequest, res: Response): Promise<void> => {
  const { categoryId, pageId, type } = req.query;
  try {
    const items = await itemService.categoryItems(categoryId, pageId, type);
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
