import { Router } from 'express';

import validateToken from 'middlewares/validateToken';
import { addLike, deleteLike } from 'controllers/like';

const router = Router();

router.post('/:id', validateToken, addLike);
router.delete('/:id', validateToken, deleteLike);

export default router;
