import { Router } from 'express';

import { getOrders } from 'controllers/orders';
import { ordersValidation } from 'validation/orders';
import validateToken from 'middlewares/validateToken';

const router = Router();

router.get('/', validateToken, ordersValidation, getOrders);

export default router;
