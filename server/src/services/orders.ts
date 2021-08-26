import { PostOrder } from 'controllers/orders';
import orderRepisitory, { IOrdersData } from 'repositories/orders';

async function getOrders(uid: string, pageId = 1, prevDate: string, currentDate: string): Promise<IOrdersData> {
  return orderRepisitory.getUserOrders(uid, pageId, prevDate, currentDate);
}

async function postOrder(uid: string, orderItems: PostOrder): Promise<void> {
  await orderRepisitory.postOrder(uid, orderItems);
}

export default {
  getOrders,
  postOrder,
};
