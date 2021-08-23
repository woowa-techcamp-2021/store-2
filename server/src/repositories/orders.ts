import { db } from 'models';
import { OrderAttributes, OrderCreationAttributes } from 'models/order';
import { Model, Sequelize } from 'sequelize';

import errorGenerator from 'utils/error/error-generator';

const filterOrders = (orders: Model<OrderAttributes, OrderCreationAttributes>[]) => {
  orders.forEach(order => {
    const statusArr = ['주문완료', '배송완료'];
    const status = order.getDataValue('status') as number;
    order.setDataValue('status', statusArr[status]);

    const salePercent = order.getDataValue('salePercent');
    const price = parseInt(order.getDataValue('price') as string, 10);
    if (salePercent !== 0) {
      order.setDataValue('price', Math.round((price * (100 - salePercent)) / 100));
    }
  });
};

const getUserOrders = async (uid: string): Promise<Model<OrderAttributes, OrderCreationAttributes>[]> => {
  const orders = await db.Order.findAll({
    attributes: [
      [Sequelize.fn('date_format', Sequelize.col('Order.createdAt'), '%Y-%m-%d'), 'createdAt'],
      [Sequelize.col('Item.thumbnail'), 'thumbnail'],
      [Sequelize.col('Item.title'), 'title'],
      [Sequelize.col('Item.price'), 'price'],
      [Sequelize.col('Item.sale_percent'), 'salePercent'],
      'quantity',
      'status',
    ],
    where: {
      UserId: uid,
    },
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: db.Item,
        attributes: [],
      },
    ],
  });

  if (!orders) {
    throw errorGenerator({
      message: 'POST /api/orders - orders not found',
      code: 'orders/orders-not-found',
    });
  }

  // TODO: 주문상태, 페이지네이션(rebase받고), 주문완성되면 case when으로 변경

  filterOrders(orders);

  return orders;
};
export default { getUserOrders };
