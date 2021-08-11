import express from 'express';

import './utils/env';
import loadApp from './loaders';

import { DEFAULT_PORT } from 'config/constants';

const PORT: number = Number(process.env.PORT) || DEFAULT_PORT;

async function startServer() {
  const app = express();

  await loadApp(app);
  app.listen(PORT, () => {
    console.log(`Server Run on ${PORT}`);
  });
}

startServer();
