import { db } from 'models';
import { Model, Op } from 'sequelize';
import { ItemAttributes, ItemCreationAttributes } from 'models/item';

import errorGenerator from 'utils/error/error-generator';

export const getAllKeywords = async (regExp: string): Promise<Model<ItemAttributes, ItemCreationAttributes>[]> => {
  const searchSnapshot = await db.Item.findAll({
    attributes: ['title'],
    where: {
      title: {
        [Op.regexp]: regExp,
      },
    },
    limit: 5,
  });

  if (!searchSnapshot) {
    throw errorGenerator({
      message: 'GET /search - search failed',
      code: 'item/search-failed',
    });
  }

  return searchSnapshot;
};
