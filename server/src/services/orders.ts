import orderRepisitory, { IOrdersData } from 'repositories/orders';
import { decodeToken } from 'utils/jwt';
import errorGenerator from 'utils/error/error-generator';

async function getOrders(token: string, pageId = 1): Promise<IOrdersData> {
  if (!token) {
    throw errorGenerator({
      message: 'GET /api/orders - no token',
      code: 'req/no-token',
    });
  }

  const { uid } = decodeToken('access', token);
  const { orders, totalCount, pageCount } = await orderRepisitory.getUserOrders(uid, pageId);

  return { orders, totalCount, pageCount };
}

export default {
  getOrders,
};
