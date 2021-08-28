import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface ItemAttributes {
  id: number;
  title: string;
  thumbnail: string;
  contents: string;
  price: number;
  originalPrice: number;
  salePercent: number;
  amount: number;
  isGreen: boolean;
  updatedAt: string;
  CategoryId: string;
  isNew: boolean;
  isBest: boolean;
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
    salePercent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saleCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DEFAULT_AMOUNT,
    },
    isGreen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    isBest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Item;
};

export default itemSchema;
