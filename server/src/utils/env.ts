import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
  ),
});
