import { Router } from 'express';

import { getOrders, postOrder } from 'controllers/orders';
import { getOrdersValidation, postOrderValidation } from 'validation/orders';
import validateToken from 'middlewares/validateToken';

const router = Router();

router.get('/', validateToken, getOrdersValidation, getOrders);
router.post('/', validateToken, postOrderValidation, postOrder);

export default router;
