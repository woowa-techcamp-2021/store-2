import { db } from 'models';
import { OrderAttributes, OrderCreationAttributes } from 'models/order';
import { Model, Sequelize } from 'sequelize';

import errorGenerator from 'utils/error/error-generator';

export interface IOrders {
  orders: Model<OrderAttributes, OrderCreationAttributes>[];
}

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

const getUserOrders = async (id: string): Promise<IOrders> => {
  const orders = await db.Order.findAll({
    attributes: [
      [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt'],
      [Sequelize.col('Items.thumbnail'), 'thumbnail'],
      [Sequelize.col('Items.title'), 'title'],
      [Sequelize.col('Items.price'), 'price'],
      [Sequelize.col('Items.sale_percent'), 'salePercent'],
      'quantity',
      'status',
    ],
    where: {
      UserId: id,
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

  return { orders };
};
export default { getUserOrders };
