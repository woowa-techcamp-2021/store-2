import { Request, Response } from 'express';

import itemService, { ItemType } from 'services/items';

import errorHandler from 'utils/error/error-handler';

interface IQuery {
  categoryId: string;
  type: ItemType;
  pageId: number;
  search: string;
}

export const getMainItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { popularItems, newItems, recommendItems } = await itemService.mainItems(req.body);
    res
      .status(200)
      .json({ popularItems: popularItems.items, newItems: newItems.items, recommendItems: recommendItems.items });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const getItems = async (req: Request<unknown, unknown, unknown, IQuery>, res: Response): Promise<void> => {
  const { categoryId, pageId, type, search } = req.query;
  try {
    const data = await itemService.getItems(categoryId, pageId, type, search);
    const { items, pageCount } = data;
    res.status(200).json({ items, pageCount });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
