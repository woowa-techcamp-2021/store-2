import { db } from 'models';
import { Model, Order, Op, Sequelize } from 'sequelize';

import { ItemAttributes, ItemCreationAttributes } from 'models/item';

import errorGenerator from 'utils/error/error-generator';

const filterItems = (items: Model<ItemAttributes, ItemCreationAttributes>[]) => {
  items.forEach(v => {
    v.setDataValue('isGreen', v.getDataValue('isGreen') === 1);
    v.setDataValue('isBest', v.getDataValue('isBest') === 1);

    const isNewDate = new Date();
    isNewDate.setMonth(isNewDate.getMonth() - 6);
    const itemDate = new Date(v.getDataValue('updatedAt'));
    if (isNewDate < itemDate) v.setDataValue('isNew', true);

    const salePercent = v.getDataValue('salePercent');
    const price = parseInt(v.getDataValue('price') as string, 10);
    if (salePercent !== 0) {
      v.setDataValue('price', Math.round((price * (100 - salePercent)) / 100));
      v.setDataValue('originalPrice', price);
    }
  });
};

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
      ['is_best', 'isBest'],
      [Sequelize.fn('date_format', Sequelize.col('updatedAt'), '%Y-%m-%d'), 'updatedAt'],
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

  filterItems(items);

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

  filterItems(items);

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

  filterItems(items);

  return items;
};

export default { getMainItems, getCategoryItems, getSearchItems };
