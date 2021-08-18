import { Router } from 'express';

import { getKeywords } from 'controllers/search';

const router = Router();

router.get('/', getKeywords);

export default router;
