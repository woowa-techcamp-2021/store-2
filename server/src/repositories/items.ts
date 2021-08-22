import { db } from 'models';
import { Model, Order, Op } from 'sequelize';

import { ItemAttributes, ItemCreationAttributes } from 'models/item';

import errorGenerator from 'utils/error/error-generator';

const getMainItems = async (
  order: string[][],
  limit: number,
): Promise<Model<ItemAttributes, ItemCreationAttributes>[]> => {
  const items = await db.Item.findAll({
    attributes: [
      'id',
      'title',
      'thumbnail',
      'price',
      ['sale_percent', 'salePercent'],
      'amount',
      ['is_green', 'isGreen'],
    ],
    order: order as Order,
    limit,
  });

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items-not-found',
    });
  }

  items.forEach(v => {
    v.setDataValue('isGreen', v.getDataValue('isGreen') === 1);
  });

  return items;
};

const getCategoryItems = async (
  pageId: number,
  order: string[][],
  categoryReg: string,
): Promise<Model<ItemAttributes, ItemCreationAttributes>[]> => {
  const items = await db.Item.findAll({
    attributes: [
      'id',
      'title',
      'thumbnail',
      'price',
      ['sale_percent', 'salePercent'],
      'amount',
      ['is_green', 'isGreen'],
    ],
    order: order as Order,
    where: { CategoryId: { [Op.regexp]: `^${categoryReg}` } },
    offset: (pageId - 1) * 8 + 1,
    limit: 12,
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

  items.forEach(v => {
    v.setDataValue('isGreen', v.getDataValue('isGreen') === 1);
  });

  return items;
};

const getSearchItems = async (
  pageId: number,
  order: string[][],
  regExp: string,
): Promise<Model<ItemAttributes, ItemCreationAttributes>[]> => {
  const items = await db.Item.findAll({
    attributes: [
      'id',
      'title',
      'thumbnail',
      'price',
      ['sale_percent', 'salePercent'],
      'amount',
      ['is_green', 'isGreen'],
    ],
    order: order as Order,
    where: {
      title: {
        [Op.regexp]: regExp,
      },
    },
    offset: (pageId - 1) * 8 + 1,
    limit: 12,
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

  items.forEach(v => {
    v.setDataValue('isGreen', v.getDataValue('isGreen') === 1);
  });

  return items;
};

const getItem = async (id: string): Promise<Model<ItemAttributes, ItemCreationAttributes>> => {
  const item = await db.Item.findOne({
    attributes: ['title', 'thumbnail', 'price', 'sale_percent', 'amount', ['is_green', 'isGreen'], 'contents'],
    where: { id },
  });

  if (!item) {
    throw errorGenerator({
      message: 'GET /api/items/:id - item not found',
      code: 'items/item-not-found',
    });
  }

  return item;
};

export default { getMainItems, getCategoryItems, getSearchItems, getItem };
