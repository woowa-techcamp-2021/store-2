import express, { Application } from 'express';

import './utils/env';
import { PORT } from 'config/constants';
import loadApp from './loaders';

async function startServer(): Promise<void> {
  const app: Application = express();

  await loadApp(app);
  app.listen(PORT);
}

startServer()
  .then(() => console.log(`Server Run on ${PORT}`))
  .catch(() => {
    console.error('Server Run Failed');
    process.exit(1);
  });
