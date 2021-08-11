import sequelize, { db } from 'models';

const { User, Item, Like, Address, Category, Order, Review } = db;

export default async () => {
  User.hasMany(Address);
  User.belongsToMany(Item, { through: Like });
  Item.belongsToMany(User, { through: Like });
  User.hasMany(Order);
  Item.hasMany(Category);
  Item.hasMany(Review);

  await sequelize.sync();
};
