import { Request, Response, NextFunction } from 'express';

function testMiddleware (req: Request, res: Response, next: NextFunction) {
  next();
}

export default testMiddleware;
