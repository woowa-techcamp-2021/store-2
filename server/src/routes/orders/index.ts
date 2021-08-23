import { Router } from 'express';

import { getOrders } from 'controllers/orders';
import { ordersValidation } from 'validation/orders';

const router = Router();

router.post('/', ordersValidation, getOrders);

export default router;
