import { Router } from 'express';
import { getTest } from 'controllers/test';
import testMiddleware from 'middlewares/testMiddleware';

const testRouter = Router();

testRouter.get('/', testMiddleware, getTest);

export default testRouter;
