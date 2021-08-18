import { db } from 'models';
import { Model, Order } from 'sequelize';

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

const getMainPopularItems = async (): Promise<Model<ItemAttribures, ItemCreationAttributes>[]> => {
  const items = await db.Item.findAll({
    attributes: ['id', 'title', 'thumbnail', 'contents', 'price', 'sale_percent', 'amount', 'is_green'],
    order: [['sale_count', 'DESC']],
    limit: 4,
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

const getMainNewItems = async (): Promise<Model<ItemAttribures, ItemCreationAttributes>[]> => {
  const items = await db.Item.findAll({
    attributes: ['id', 'title', 'thumbnail', 'contents', 'price', 'sale_percent', 'amount', 'is_green'],
    order: [['updatedAt', 'DESC']],
    limit: 8,
    raw: true,
  });

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items/not-found',
    });
  }

  return items;
};

const getMainRecommendItems = async (): Promise<Model<ItemAttribures, ItemCreationAttributes>[]> => {
  const items = await db.Item.findAll({
    attributes: ['id', 'title', 'thumbnail', 'contents', 'price', 'sale_percent', 'amount', 'is_green'],
    // order:[]
    limit: 4,
    raw: true,
  });

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items/not-found',
    });
  }

  return items;
};

const getCategoryItems = async (
  categoryId: string,
  pageId: number,
  order: string[][],
): Promise<Model<ItemAttribures, ItemCreationAttributes>[]> => {
  const items = await db.Item.findAll({
    attributes: ['id', 'title', 'thumbnail', 'contents', 'price', 'sale_percent', 'amount', 'is_green'],
    order: order as Order,
    where: { CategoryId: categoryId },
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

export default { getMainItems, getMainPopularItems, getMainNewItems, getMainRecommendItems, getCategoryItems };
