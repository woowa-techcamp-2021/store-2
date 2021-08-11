import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface ItemAttribures {
  id: string;
  title: string;
  thumbnail: string;
  contents: string;
  price: string;
  sale_percent: number;
  amount: number;
  is_green: number;
}

export interface ItemCreationAttributes
  extends Optional<ItemAttribures, 'id' | 'amount'> {}

const DEFAULT_AMOUNT = 1;

const itemSchema = (
  sequelize: Sequelize,
): ModelCtor<Model<ItemAttribures, ItemCreationAttributes>> => {
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
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    contents: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    sale_percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DEFAULT_AMOUNT,
    },
    is_green: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  });

  return Item;
};

export default itemSchema;
