import orderRepisitory, { IOrdersData } from 'repositories/orders';
import { decodeToken } from 'utils/jwt';

async function getOrders(token: string, pageId = 1, prevDate: string, currentDate: string): Promise<IOrdersData> {
  const { uid } = decodeToken('access', token);
  const { orders, totalCount, pageCount } = await orderRepisitory.getUserOrders(uid, pageId, prevDate, currentDate);

  return { orders, totalCount, pageCount };
}

export default {
  getOrders,
};
