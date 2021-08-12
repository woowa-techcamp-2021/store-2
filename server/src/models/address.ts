import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface AddressAttribures {
  id: string;
  name: string;
  address: string;
  receiver: string;
}

export type AddressCreationAttributes = Optional<AddressAttribures, 'id'>;

const addressSchema = (
  sequelize: Sequelize,
): ModelCtor<Model<AddressAttribures, AddressCreationAttributes>> => {
  const Address = sequelize.define('Address', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });

  return Address;
};

export default addressSchema;
