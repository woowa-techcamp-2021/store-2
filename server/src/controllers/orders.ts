import { Request, Response } from 'express';
import ordersService from 'services/orders';
import errorHandler from 'utils/error/error-handler';
import { getAccessToken } from 'utils/jwt';

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const token = getAccessToken(req.headers.authorization);
  try {
    const orders = await ordersService.getOrders(token);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
