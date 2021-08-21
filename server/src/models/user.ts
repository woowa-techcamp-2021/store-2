import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

import { USER } from 'config/constants';

export interface UserAttribures {
  id: string;
  user_id: string;
  password: string;
  provider: string;
  phone: string;
}

export type UserCreationAttributes = Optional<UserAttribures, 'id' | 'phone' | 'password'>;

const HASHED_PASSWORD_LENGTH = 60;

const userSchema = (sequelize: Sequelize): ModelCtor<Model<UserAttribures, UserCreationAttributes>> => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.STRING(USER.ID_MAX_LENGTH),
      allowNull: false,
      unique: 'user_id',
    },
    password: {
      type: DataTypes.STRING(HASHED_PASSWORD_LENGTH),
    },
    provider: {
      type: DataTypes.STRING(USER.PROVIDER_LENGTH),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(USER.PHONE_LENGTH),
    },
  });

  return User;
};

export default userSchema;
