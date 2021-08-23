import orderRepisitory from 'repositories/orders';
import { OrderAttributes, OrderCreationAttributes } from 'models/order';
import { Model } from 'sequelize';
import { decodeToken } from 'utils/jwt';
import errorGenerator from 'utils/error/error-generator';

async function getOrders(token: string): Promise<Model<OrderAttributes, OrderCreationAttributes>[]> {
  if (!token) {
    throw errorGenerator({
      message: 'GET /api/orders - no token',
      code: 'req/no-token',
    });
  }

  const { uid } = decodeToken('access', token);
  const orders = await orderRepisitory.getUserOrders(uid);
  return orders;
}

export default {
  getOrders,
};
