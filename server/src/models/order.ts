import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

import { ORDER } from 'config/constants';

export interface OrderAttributes {
  id: number;
  address: string;
  receiver: string;
  quantity: number;
  status: number;
  UserId: string;
  ItemId: number;
  createdAt: string;
}

export type OrderCreationAttributes = Optional<OrderAttributes, 'id' | 'status' | 'createdAt'>;

const orderSchema = (sequelize: Sequelize): ModelCtor<Model<OrderAttributes, OrderCreationAttributes>> => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(ORDER.ADDRESS_MAX_LENGTH),
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING(ORDER.RECEIVER_MAX_LENGTH),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Order;
};

export default orderSchema;
