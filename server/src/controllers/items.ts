import { Request, Response } from 'express';

import itemService, { ItemType } from 'services/items';

import errorHandler from 'utils/error/error-handler';
import { getUIDFromToken, getAccessToken, checkTokenExists } from 'utils/jwt';

interface IQuery {
  categoryId: string;
  type: ItemType;
  pageId: number;
  search: string;
}

interface IParams {
  id: string;
}

export const getMainItems = async (req: Request, res: Response): Promise<void> => {
  try {
    let uid;
    if (checkTokenExists(req)) uid = getUIDFromToken(getAccessToken(req.headers.authorization));

    const { popularItems, newItems, recommendItems } = await itemService.mainItems(req.body);

    res.status(200).json({
      popularItems: await itemService.matchUserLikeItem(popularItems.items, uid),
      newItems: await itemService.matchUserLikeItem(newItems.items, uid),
      recommendItems: await itemService.matchUserLikeItem(recommendItems.items, uid),
    });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const getItems = async (req: Request<unknown, unknown, string[], IQuery>, res: Response): Promise<void> => {
  const { categoryId, pageId, type, search } = req.query;
  try {
    let uid;
    if (checkTokenExists(req)) uid = getUIDFromToken(getAccessToken(req.headers.authorization));

    const data = await itemService.getItems(categoryId, pageId, type, search, req.body);
    const { items, totalCount, pageCount } = data;

    res.status(200).json({ items: await itemService.matchUserLikeItem(items, uid), totalCount, pageCount });
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
