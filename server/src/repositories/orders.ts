import { db } from 'models';
import { OrderAttributes, OrderCreationAttributes } from 'models/order';
import { Model, Sequelize } from 'sequelize';

import errorGenerator from 'utils/error/error-generator';

const LIMIT_COUNT = 10;

interface IOrders {
  orders: Model<OrderAttributes, OrderCreationAttributes>[];
}

export interface IOrdersData extends IOrders {
  totalCount: number;
  pageCount: number;
}

const getUserOrders = async (uid: string, pageId: number): Promise<IOrdersData> => {
  const orders = await db.Order.findAll({
    attributes: [
      [Sequelize.fn('date_format', Sequelize.col('Order.createdAt'), '%Y-%m-%d'), 'createdAt'],
      [Sequelize.col('Item.thumbnail'), 'thumbnail'],
      [Sequelize.col('Item.title'), 'title'],
      'quantity',
      [Sequelize.literal(`CASE WHEN status=1 THEN '배송완료' ELSE '주문완료' END`), 'status'],
      [
        Sequelize.literal(
          'CASE WHEN Item.salePercent !=0 THEN ROUND(Item.price - (Item.price * Item.salePercent /100),0) ELSE Item.price END',
        ),
        'price',
      ],
    ],
    where: {
      UserId: uid,
    },
    limit: LIMIT_COUNT,
    offset: (pageId - 1) * LIMIT_COUNT,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: db.Item,
        attributes: [],
      },
    ],
  });

  const totalCount = await db.Order.count({ where: { UserId: uid } });
  const pageCount = Math.ceil(totalCount / LIMIT_COUNT);

  if (!orders) {
    throw errorGenerator({
      message: 'POST /api/orders - orders not found',
      code: 'orders/orders-not-found',
    });
  }

  return { orders, totalCount, pageCount };
};
export default { getUserOrders };
