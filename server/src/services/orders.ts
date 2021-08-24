import orderRepisitory, { IOrdersData } from 'repositories/orders';

async function getOrders(uid: string, pageId = 1, prevDate: string, currentDate: string): Promise<IOrdersData> {
  return orderRepisitory.getUserOrders(uid, pageId, prevDate, currentDate);
}

export default {
  getOrders,
};
