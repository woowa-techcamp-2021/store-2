import { db } from 'models';
import { Model, Order, Op } from 'sequelize';

import { ItemAttribures, ItemCreationAttributes } from 'models/item';

import errorGenerator from 'utils/error/error-generator';

const getMainItems = async (
  order: string[][],
  limit: number,
): Promise<Model<ItemAttribures, ItemCreationAttributes>[]> => {
  const items = await db.Item.findAll({
    attributes: ['id', 'title', 'thumbnail', 'contents', 'price', 'sale_percent', 'amount', 'is_green'],
    order: order as Order,
    limit,
    raw: true,
  });

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items-not-found',
    });
  }

  return items;
};

const getCategoryItems = async (
  pageId: number,
  order: string[][],
  categoryReg: string,
): Promise<Model<ItemAttribures, ItemCreationAttributes>[]> => {
  const items = await db.Item.findAll({
    attributes: ['id', 'title', 'thumbnail', 'contents', 'price', 'sale_percent', 'amount', 'is_green'],
    order: order as Order,
    where: { CategoryId: { [Op.regexp]: `^${categoryReg}` } },
    offset: (pageId - 1) * 8 + 1,
    limit: 12,
    raw: true,
    include: [
      {
        model: db.Category,
        attributes: [],
      },
    ],
  });

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items/not-found',
    });
  }

  return items;
};

export default { getMainItems, getCategoryItems };
