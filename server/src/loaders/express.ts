import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import corsOptions from 'config/cors';
import routes from 'routes';

export default (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(corsOptions));

  app.use('/api', routes);

  app.all('*', (req, res, next) => {
    res.status(404).send('404');
  });
};
