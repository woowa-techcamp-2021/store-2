import orderRepisitory, { IOrdersData } from 'repositories/orders';

async function getOrders(uid: string, pageId = 1, prevDate: string, currentDate: string): Promise<IOrdersData> {
  return orderRepisitory.getUserOrders(uid, pageId, prevDate, currentDate);
}

async function postOrder(
  uid: string,
  phone: string,
  receiver: string,
  address: string,
  itemId: number,
  quantity: number,
): Promise<void> {
  await orderRepisitory.postOrder(uid, phone, receiver, address, itemId, quantity);
}

export default {
  getOrders,
  postOrder,
};
