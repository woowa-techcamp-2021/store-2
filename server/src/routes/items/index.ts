import { Router } from 'express';

import { getCategoryItems, getMainItems } from 'controllers/items';

const router = Router();
router.get('/main', getMainItems);
router.get('/category', getCategoryItems);

export default router;
