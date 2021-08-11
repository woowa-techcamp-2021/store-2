import { Router } from 'express';
import testRouter from './test';

const router = Router();

router.use('/test', testRouter);

export default router;
