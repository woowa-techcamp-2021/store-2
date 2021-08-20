import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface ItemAttributes {
  id: string;
  title: string;
  thumbnail: string;
  contents: string;
  price: string | number;
  originalPrice: number;
  sale_percent: number;
  salePercent: number;
  sale_count: number;
  amount: number;
  is_green: number | boolean;
  isGreen: number | boolean;
  is_best: number | boolean;
  isBest: number | boolean;
  updatedAt: string;
  isNew: boolean;
  CategoryId: string;
}

export type ItemCreationAttributes = Optional<ItemAttributes, 'id' | 'amount'>;

const DEFAULT_AMOUNT = 1;

const itemSchema = (sequelize: Sequelize): ModelCtor<Model<ItemAttributes, ItemCreationAttributes>> => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contents: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    sale_percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sale_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DEFAULT_AMOUNT,
    },
    is_green: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    is_best: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Item;
};

export default itemSchema;
