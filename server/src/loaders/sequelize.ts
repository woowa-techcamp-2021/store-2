import sequelize, { db } from 'models';
import { CATEGORY_DATA } from 'config/constants';

const { User, Item, Like, Address, Category, Order, Review } = db;

export default async (): Promise<void> => {
  User.hasMany(Address);
  User.belongsToMany(Item, { through: Like });
  Item.belongsToMany(User, { through: Like });
  User.hasMany(Order);
  Category.hasMany(Item);
  Item.hasMany(Review);

  await sequelize.sync({ alter: true });

  const rows = await Category.findAll();
  if (!rows.length) {
    await Promise.all(CATEGORY_DATA.map(({ id, name }) => db.Category.create({ id, name })));
    console.info('Category Data Initialized');
  }
};
