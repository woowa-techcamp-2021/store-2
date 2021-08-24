import { Router } from 'express';

import { getItems, getMainItems, getItem } from 'controllers/items';

const router = Router();
router.post('/main', getMainItems);
router.get('/:id', getItem);
router.post('/', getItems);

export default router;
