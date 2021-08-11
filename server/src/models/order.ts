import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface OrderAttributes {
  id: number;
  address: string;
  receiver: string;
  quantity: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

const orderSchema = (
  sequelize: Sequelize,
): ModelCtor<Model<OrderAttributes, OrderCreationAttributes>> => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return Order;
};

export default orderSchema;
