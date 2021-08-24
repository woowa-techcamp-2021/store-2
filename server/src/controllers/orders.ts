import { Request, Response } from 'express';
import ordersService from 'services/orders';
import errorHandler from 'utils/error/error-handler';
import { decodeToken, getAccessToken } from 'utils/jwt';

interface IQuery {
  pageId: number;
  prevDate: string;
  currentDate: string;
}

export const getOrders = async (req: Request<unknown, unknown, unknown, IQuery>, res: Response): Promise<void> => {
  const { pageId, prevDate, currentDate } = req.query;
  const token = getAccessToken(req.headers.authorization);
  const { uid } = decodeToken('access', token);
  try {
    const { orders, pageCount, totalCount } = await ordersService.getOrders(uid, pageId, prevDate, currentDate);
    res.status(200).json({ orders, pageCount, totalCount });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
