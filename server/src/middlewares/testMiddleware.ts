import { Request, Response, NextFunction } from 'express';

function testMiddleware(req: Request, res: Response, next: NextFunction): void {
  next();
}

export default testMiddleware;
