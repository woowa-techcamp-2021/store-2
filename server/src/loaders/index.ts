import { Application } from 'express';

import expressLoader from './express';
import sequelizeLoader from './sequelize';

export default async (app: Application): Promise<void> => {
  await sequelizeLoader();
  console.info('DB connected');

  expressLoader(app);
  console.info('Express loaded');
};
