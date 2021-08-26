import { Router } from 'express';

import { getOrders, postOrder, checkPaidUser } from 'controllers/orders';
import { getOrdersValidation, postOrderValidation, checkPaidUserValidation } from 'validation/orders';
import validateToken from 'middlewares/validateToken';

const router = Router();

router.get('/', validateToken, getOrdersValidation, getOrders);
router.get('/user', validateToken, checkPaidUserValidation, checkPaidUser);
router.post('/', validateToken, postOrderValidation, postOrder);

export default router;
