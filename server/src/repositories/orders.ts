import { db } from 'models';
import { OrderAttributes, OrderCreationAttributes } from 'models/order';
import { Op, Model, Sequelize } from 'sequelize';

import { OrderList } from 'services/orders';

import errorGenerator from 'utils/error/error-generator';

const LIMIT_COUNT = 10;

interface IOrders {
  orders: Model<OrderAttributes, OrderCreationAttributes>[];
}

export interface IOrdersData extends IOrders {
  totalCount: number;
  pageCount: number;
}

const getUserOrders = async (
  uid: string,
  pageId: number,
  prevDate: string,
  currentDate: string,
): Promise<IOrdersData> => {
  const [orders, totalCount] = await Promise.all([
    db.Order.findAll({
      attributes: [
        [Sequelize.fn('date_format', Sequelize.col('Order.createdAt'), '%Y-%m-%d'), 'createdAt'],
        [Sequelize.col('Item.id'), 'id'],
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
        createdAt: {
          [Op.gte]: prevDate,
          [Op.lte]: currentDate,
        },
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
    }),
    db.Order.count({
      where: {
        UserId: uid,
        createdAt: {
          [Op.gte]: prevDate,
          [Op.lte]: currentDate,
        },
      },
    }),
  ]);

  const pageCount = Math.ceil(totalCount / LIMIT_COUNT);

  if (!orders) {
    throw errorGenerator({
      message: 'GET /api/orders - fail to load orders',
      code: 'orders/fail-to-load-orders',
    });
  }

  return { orders, totalCount, pageCount };
};

const postOrder = async (uid: string, phone: string, orderList: OrderList[]): Promise<void> => {
  await Promise.all([
    db.Order.bulkCreate(orderList, { validate: true }),
    db.User.update({ phone }, { where: { id: uid } }),
  ]);
};

const checkPaidUser = async (uid: string, itemId: number): Promise<boolean> => {
  const paidCount = await db.Order.count({
    where: {
      ItemId: itemId,
      UserId: uid,
    },
  });

  return !!paidCount;
};

export default { getUserOrders, postOrder, checkPaidUser };
