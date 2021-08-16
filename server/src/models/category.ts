import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface CategoryAttributes {
  id: string;
  name: string;
}

export type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;

const categorySchema = (sequelize: Sequelize): ModelCtor<Model<CategoryAttributes, CategoryCreationAttributes>> => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.STRING(6),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return Category;
};

export default categorySchema;
