import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';
import { ADDRESS } from 'config/constants';

export interface AddressAttribures {
  id: string;
  name: string;
  address: string;
  addressDetail: string;
  receiver: string;
  UserId: string;
}

export type AddressCreationAttributes = Optional<AddressAttribures, 'id'>;

const addressSchema = (sequelize: Sequelize): ModelCtor<Model<AddressAttribures, AddressCreationAttributes>> => {
  const Address = sequelize.define('Address', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(ADDRESS.NAME_MAX_LENGTH),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(ADDRESS.ADDRESS_MAX_LENGTH),
      allowNull: false,
    },
    addressDetail: {
      type: DataTypes.STRING(ADDRESS.ADDRESS_MAX_LENGTH),
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING(ADDRESS.RECEIVER_MAX_LENGTH),
      allowNull: false,
    },
  });

  return Address;
};

export default addressSchema;
