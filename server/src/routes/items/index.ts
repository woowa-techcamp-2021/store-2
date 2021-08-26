import { Router } from 'express';

import checkExistHeader from 'middlewares/checkExistHeader';
import { getItems, getMainItems, getItem, getOrderItems } from 'controllers/items';

const router = Router();

router.post('/main', checkExistHeader, getMainItems);
router.post('/', checkExistHeader, getItems);
router.get('/:id', checkExistHeader, getItem);
router.get('/order', getOrderItems);

export default router;
