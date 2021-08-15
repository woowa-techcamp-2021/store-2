import { Router } from 'express';

import { signin } from 'controllers/auth';
import { signInValidateion } from 'validation/auth';

const router = Router();

router.post('/', signInValidateion, signin);

export default router;
