import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface UserAttribures {
  id: string;
  user_id: string;
  password: string;
  provider: string;
  phone: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttribures, 'id'> {}

const userSchema = (
  sequelize: Sequelize,
): ModelCtor<Model<UserAttribures, UserCreationAttributes>> => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
    },
    provider: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(12),
    },
  });

  return User;
};

export default userSchema;
