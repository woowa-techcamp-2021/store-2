import { db } from 'models';
import { Model, Order, Op, Sequelize } from 'sequelize';

import { ItemAttributes, ItemCreationAttributes } from 'models/item';

import errorGenerator from 'utils/error/error-generator';

export interface IItems {
  items: Model<ItemAttributes, ItemCreationAttributes>[];
}

export interface IItemsData extends IItems {
  pageCount: number;
}

const filterItems = (items: Model<ItemAttributes, ItemCreationAttributes>[]) => {
  items.forEach(item => {
    item.setDataValue('isGreen', item.getDataValue('isGreen') === 1);
    item.setDataValue('isBest', item.getDataValue('isBest') === 1);

    const standardDate = new Date();
    standardDate.setMonth(standardDate.getMonth() - 6);
    const itemDate = new Date(item.getDataValue('updatedAt'));
    if (standardDate < itemDate) item.setDataValue('isNew', true);

    const salePercent = item.getDataValue('salePercent');
    const price = parseInt(item.getDataValue('price') as string, 10);
    if (salePercent !== 0) {
      item.setDataValue('price', Math.round((price * (100 - salePercent)) / 100));
      item.setDataValue('originalPrice', price);
    }
  });
};

const getMainItems = async (order: string[][], limit: number): Promise<IItems> => {
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

  return { items };
};

const getCategoryItems = async (pageId: number, order: string[][], categoryReg: string): Promise<IItemsData> => {
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

  const pageCount = Math.ceil(
    (await db.Item.count({ where: { CategoryId: { [Op.regexp]: `^${categoryReg}` } } })) / 12,
  );

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items/not-found',
    });
  }

  filterItems(items);

  return { items, pageCount };
};

const getSearchItems = async (pageId: number, order: string[][], regExp: string): Promise<IItemsData> => {
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

  const pageCount = Math.ceil(
    (await db.Item.count({
      where: {
        title: {
          [Op.regexp]: regExp,
        },
      },
    })) / 12,
  );

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items/not-found',
    });
  }

  filterItems(items);

  return { items, pageCount };
};

export default { getMainItems, getCategoryItems, getSearchItems };
