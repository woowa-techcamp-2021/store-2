import { Router } from 'express';

import { getItems, getMainItems, getItem, getOrderItems } from 'controllers/items';

const router = Router();
router.post('/main', getMainItems);
router.get('/order', getOrderItems);
router.get('/:id', getItem);
router.post('/', getItems);

export default router;
