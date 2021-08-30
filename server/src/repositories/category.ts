import { db } from 'models';
import { Model } from 'sequelize';

import { CategoryAttributes, CategoryCreationAttributes } from 'models/category';

import errorGenerator from 'utils/error/error-generator';

export type CategoryModel = Model<CategoryAttributes, CategoryCreationAttributes>[];

const getCategories = async (): Promise<CategoryModel> => {
  const categorySnapshot = await db.Category.findAll({
    attributes: [['id', 'code'], 'name'],
    raw: true,
  });

  if (!categorySnapshot || categorySnapshot.length === 0) {
    throw errorGenerator({
      message: 'GET /api/categories - categories not found',
      code: 'categories/categories-not-found',
    });
  }

  return categorySnapshot;
};

export default { getCategories };
