import { Request, Response } from 'express';
import ordersService from 'services/orders';
import errorHandler from 'utils/error/error-handler';
import { getAccessToken } from 'utils/jwt';

interface IQuery {
  pageId: number;
}

export const getOrders = async (req: Request<unknown, unknown, unknown, IQuery>, res: Response): Promise<void> => {
  const { pageId } = req.query;
  const token = getAccessToken(req.headers.authorization);
  try {
    const { orders, pageCount, totalCount } = await ordersService.getOrders(token, pageId);
    res.status(200).json({ orders, pageCount, totalCount });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
