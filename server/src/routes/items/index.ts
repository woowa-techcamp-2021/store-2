import { Router } from 'express';

import checkExistHeader from 'middlewares/checkExistHeader';
import { getItems, getMainItems, getItem } from 'controllers/items';

const router = Router();

router.post('/main', checkExistHeader, getMainItems);
router.post('/', checkExistHeader, getItems);
router.get('/:id', checkExistHeader, getItem);

export default router;
