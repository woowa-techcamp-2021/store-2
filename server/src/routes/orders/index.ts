import { Router } from 'express';

import { getOrders } from 'controllers/orders';

const router = Router();

router.get('/', getOrders);

export default router;
