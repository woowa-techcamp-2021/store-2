import orderRepisitory from 'repositories/orders';
import { OrderAttributes, OrderCreationAttributes } from 'models/order';
import { Model } from 'sequelize';

async function getOrders(uid: string): Promise<Model<OrderAttributes, OrderCreationAttributes>[]> {
  const orders = await orderRepisitory.getUserOrders(uid);
  return orders;
}

export default {
  getOrders,
};
