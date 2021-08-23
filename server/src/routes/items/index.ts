import { Router } from 'express';

import { getItems, getMainItems } from 'controllers/items';

const router = Router();
router.post('/main', getMainItems);
router.get('/', getItems);

export default router;
