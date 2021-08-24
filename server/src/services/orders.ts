import orderRepisitory, { IOrdersData } from 'repositories/orders';

async function getOrders(uid: string, pageId = 1, prevDate: string, currentDate: string): Promise<IOrdersData> {
  const { orders, totalCount, pageCount } = await orderRepisitory.getUserOrders(uid, pageId, prevDate, currentDate);

  return { orders, totalCount, pageCount };
}

export default {
  getOrders,
};
