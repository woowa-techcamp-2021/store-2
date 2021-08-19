import { Router } from 'express';

import { getItems, getMainItems } from 'controllers/items';

const router = Router();
router.get('/main', getMainItems);
router.get('/', getItems);

export default router;
