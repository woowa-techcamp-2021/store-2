import { db } from 'models';
import { Model, Order, Op, Sequelize } from 'sequelize';

import { ItemAttributes, ItemCreationAttributes } from 'models/item';

import errorGenerator from 'utils/error/error-generator';

export interface IItems {
  items: Model<ItemAttributes, ItemCreationAttributes>[];
}

export interface IItemsData extends IItems {
  totalCount: number;
  pageCount: number;
}

export interface IScore {
  title: string;
  score: number;
}

const LIMIT_COUNT = 12;

const filterItems = (items: Model<ItemAttributes, ItemCreationAttributes>[]) => {
  items.forEach(item => {
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

const getRecommendItems = async (visited: string[], isCategoryItem: boolean): Promise<IItems> => {
  if (visited.length > 0) {
    const scores = await db.Score.findAll({
      where: {
        title: {
          [Op.or]: visited.reverse().slice(0, 5),
        },
      },
    });

    const rank: IScore[] = [];
    scores.forEach(row => {
      const data = row.getDataValue('scores');
      const scoreStr = data
        .substring(0, data.length - 1)
        .slice(1)
        .replace(/'/g, '"');
      const scoreJson = JSON.parse(scoreStr) as IScore[];
      scoreJson.forEach(score => rank.push(score));
    });

    rank.sort((a, b) => b.score - a.score);

    let rankTitles: string[] = [];
    rank.forEach(row => {
      rankTitles.push(row.title);
    });
    rankTitles = rankTitles.filter((item, index) => rankTitles.indexOf(item) === index);
    if (!isCategoryItem) {
      rankTitles = rankTitles.slice(0, LIMIT_COUNT);
    }

    const items = await db.Item.findAll({
      attributes: [
        'id',
        'title',
        'thumbnail',
        'price',
        'salePercent',
        'amount',
        'isGreen',
        'isBest',
        [Sequelize.fn('date_format', Sequelize.col('updatedAt'), '%Y-%m-%d'), 'updatedAt'],
      ],
      where: {
        title: {
          [Op.or]: rankTitles,
        },
      },
    });

    const sortedItems: IItems = { items: [] };
    rankTitles.forEach(ranktitle => {
      const findItem = items.find(item => item.getDataValue('title') === ranktitle) as Model<
        ItemAttributes,
        ItemCreationAttributes
      >;
      if (findItem) sortedItems.items.push(findItem);
    });

    filterItems(sortedItems.items);

    return { items: sortedItems.items };
  }

  const items = await db.Item.findAll({
    order: Sequelize.literal('rand()'),
    attributes: [
      'id',
      'title',
      'thumbnail',
      'price',
      'salePercent',
      'amount',
      'isGreen',
      'isBest',
      [Sequelize.fn('date_format', Sequelize.col('updatedAt'), '%Y-%m-%d'), 'updatedAt'],
    ],
    limit: LIMIT_COUNT,
  });

  filterItems(items);

  return { items };
};

const getMainItems = async (order: string[][], limit: number): Promise<IItems> => {
  const items = await db.Item.findAll({
    attributes: [
      'id',
      'title',
      'thumbnail',
      'price',
      'salePercent',
      'amount',
      'isGreen',
      'isBest',
      [Sequelize.fn('date_format', Sequelize.col('updatedAt'), '%Y-%m-%d'), 'updatedAt'],
    ],
    order: order as Order,
    limit,
  });

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items/items-not-found',
    });
  }

  filterItems(items);

  return { items };
};

const getCategoryItems = async (pageId: number, order: string[][], categoryReg: string): Promise<IItemsData> => {
  const items = await db.Item.findAll({
    attributes: ['id', 'title', 'thumbnail', 'price', 'salePercent', 'amount', 'isGreen'],
    order: order as Order,
    where: { CategoryId: { [Op.regexp]: `^${categoryReg}` } },
    offset: (pageId - 1) * LIMIT_COUNT,
    limit: LIMIT_COUNT,
    include: [
      {
        model: db.Category,
        attributes: [],
      },
    ],
  });

  const totalCount = await db.Item.count({ where: { CategoryId: { [Op.regexp]: `^${categoryReg}` } } });

  const pageCount = Math.ceil(totalCount / LIMIT_COUNT);

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items/not-found',
    });
  }

  filterItems(items);

  return { items, totalCount, pageCount };
};

const getCategoryRecommendItems = async (
  pageId: number,
  categoryReg: string,
  visited: string[],
): Promise<IItemsData> => {
  let items = await db.Item.findAll({
    attributes: ['id', 'title', 'thumbnail', 'price', 'salePercent', 'amount', 'isGreen'],
    where: { CategoryId: { [Op.regexp]: `^${categoryReg}` } },
    include: [
      {
        model: db.Category,
        attributes: [],
      },
    ],
  });

  const recommendItems: IItems = await getRecommendItems(visited, true);
  recommendItems.items = recommendItems.items.filter(item =>
    items.some(categoryItem => categoryItem.getDataValue('title') === item.getDataValue('title')),
  );

  items = items.filter(
    item =>
      !recommendItems.items.some(recommendItem => recommendItem.getDataValue('title') === item.getDataValue('title')),
  );
  items = recommendItems.items.concat(items).slice((pageId - 1) * LIMIT_COUNT, pageId * LIMIT_COUNT);

  const totalCount = await db.Item.count({ where: { CategoryId: { [Op.regexp]: `^${categoryReg}` } } });
  const pageCount = Math.ceil(totalCount / LIMIT_COUNT);

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items/not-found',
    });
  }

  filterItems(items);

  return { items, totalCount, pageCount };
};

const getSearchItems = async (pageId: number, order: string[][], regExp: string): Promise<IItemsData> => {
  const items = await db.Item.findAll({
    attributes: ['id', 'title', 'thumbnail', 'price', 'salePercent', 'amount', 'isGreen'],
    order: order as Order,
    where: {
      title: {
        [Op.regexp]: regExp,
      },
    },
    offset: (pageId - 1) * LIMIT_COUNT,
    limit: LIMIT_COUNT,
    include: [
      {
        model: db.Category,
        attributes: [],
      },
    ],
  });

  const totalCount = await db.Item.count({
    where: {
      title: {
        [Op.regexp]: regExp,
      },
    },
  });

  const pageCount = Math.ceil(totalCount / LIMIT_COUNT);

  if (!items) {
    throw errorGenerator({
      message: 'POST /api/items - items not found',
      code: 'items/not-found',
    });
  }

  filterItems(items);

  return { items, totalCount, pageCount };
};

const getItem = async (id: string): Promise<Model<ItemAttributes, ItemCreationAttributes>> => {
  const item = await db.Item.findOne({
    attributes: ['title', 'thumbnail', 'price', 'salePercent', 'amount', 'isGreen', 'contents'],
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

export default {
  getMainItems,
  getCategoryItems,
  getSearchItems,
  getItem,
  getRecommendItems,
  getCategoryRecommendItems,
};
