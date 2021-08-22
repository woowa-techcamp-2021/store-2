import { Request, Response } from 'express';

import itemService from 'services/items';

import errorHandler from 'utils/error/error-handler';

interface IQuery {
  categoryId: string;
  type: string;
  pageId: number;
  search: string;
}

interface IParams {
  id: string;
}

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

export const getItems = async (req: Request<unknown, unknown, unknown, IQuery>, res: Response): Promise<void> => {
  const { categoryId, pageId, type, search } = req.query;
  try {
    const items = await itemService.getItems(categoryId, pageId, type, search);
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const getItem = async (req: Request<IParams, unknown, unknown, unknown>, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const items = await itemService.getItem(id);
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
