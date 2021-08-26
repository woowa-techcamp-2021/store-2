import { Request, Response, NextFunction } from 'express';
import { checkTokenExists } from 'utils/jwt';

import validateToken from './validateToken';

async function checkExistHeader(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (checkTokenExists(req)) await validateToken(req, res, next);
  else next();
}

export default checkExistHeader;
