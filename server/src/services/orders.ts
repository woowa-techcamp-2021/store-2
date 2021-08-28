import { PostOrder } from 'controllers/orders';
import orderRepisitory, { IOrdersData } from 'repositories/orders';

export interface OrderList {
  address: string;
  receiver: string;
  quantity: number;
  ItemId: number;
  UserId: string;
}

async function getOrders(uid: string, pageId = 1, prevDate: string, currentDate: string): Promise<IOrdersData> {
  return orderRepisitory.getUserOrders(uid, pageId, prevDate, currentDate);
}

async function postOrder(uid: string, orderItems: PostOrder): Promise<void> {
  const { address, receiver, phone, itemList } = orderItems;

  const orderList = itemList.map(({ quantity, itemId }) => ({
    address,
    receiver,
    quantity,
    ItemId: itemId,
    UserId: uid,
  }));

  await orderRepisitory.postOrder(uid, phone, orderList);
}

export default {
  getOrders,
  postOrder,
};
