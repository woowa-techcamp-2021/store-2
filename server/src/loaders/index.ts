import { Application } from 'express';

import expressLoader from './express';
import sequelizeLoader from './sequelize';

export default async (app: Application) => {
  expressLoader(app);
  console.log('Express loaded');
  await sequelizeLoader();
  console.log('DB connected');
}
