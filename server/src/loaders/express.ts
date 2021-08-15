import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import corsOptions from 'config/cors';
import routes from 'routes';

export default (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(corsOptions));

  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  app.use('/api', routes);

  app.all('*', (req, res, _next) => {
    res.status(404).send('404');
  });
};
