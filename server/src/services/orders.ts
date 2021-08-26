import { PostOrder } from 'controllers/orders';
import orderRepisitory, { IOrdersData } from 'repositories/orders';

async function getOrders(uid: string, pageId = 1, prevDate: string, currentDate: string): Promise<IOrdersData> {
  return orderRepisitory.getUserOrders(uid, pageId, prevDate, currentDate);
}

async function postOrder(uid: string, orderItems: PostOrder): Promise<void> {
  await orderRepisitory.postOrder(uid, orderItems);
}

async function checkPaidUser(uid: string, itemId: number): Promise<boolean> {
  const isPaid = await orderRepisitory.checkPaidUser(uid, itemId);
  return isPaid;
}

export default {
  getOrders,
  postOrder,
  checkPaidUser,
};
