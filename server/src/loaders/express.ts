import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import corsOptions from 'config/cors';
import routes from 'routes';

import morgan from 'morgan';

export default (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(corsOptions));

  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  app.use('/api', routes);

  app.all('*', (req, res, next) => {
    res.status(404).send('404');
  });
};
