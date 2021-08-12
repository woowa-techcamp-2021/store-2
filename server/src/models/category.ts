import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface CategoryAttribures {
  id: string;
  name: string;
}

export type CategoryCreationAttributes = Optional<CategoryAttribures, 'id'>;

const categorySchema = (
  sequelize: Sequelize,
): ModelCtor<Model<CategoryAttribures, CategoryCreationAttributes>> => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  });

  return Category;
};

export default categorySchema;
