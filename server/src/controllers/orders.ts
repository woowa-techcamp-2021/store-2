import { Request, Response } from 'express';
import ordersService from 'services/orders';
import errorHandler from 'utils/error/error-handler';
// import { decodeToken, getAccessToken } from 'utils/jwt';

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  // TODO: 프론트 연동 후 주석 갈아끼우기
  // const token = getAccessToken(req.headers.authorization);
  // const { uid } = decodeToken('access', token);
  const uid = 'c50f7860-aa58-440f-825a-37aaa04b8182';
  try {
    const orders = await ordersService.getOrders(uid);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
