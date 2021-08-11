import { Sequelize } from 'sequelize';

import userSchema from './user';
import itemSchema from './item';
import likeSchema from './like';
import addressSchema from './address';
import categorySchema from './category';
import orderSchema from './order';
import reviewSchema from './review';

import configFile from '../config/db';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const User = userSchema(sequelize);
const Item = itemSchema(sequelize);
const Like = likeSchema(sequelize);
const Address = addressSchema(sequelize);
const Category = categorySchema(sequelize);
const Order = orderSchema(sequelize);
const Review = reviewSchema(sequelize);

// Associations
User.hasMany(Address);
User.belongsToMany(Item, { through: Like });
Item.belongsToMany(User, { through: Like });
User.hasMany(Order);
Item.hasMany(Category);
Item.hasMany(Review);

export const db = {
  User,
  Item,
  Like,
  Address,
  Category,
  Order,
  Review,
};

export default sequelize;
