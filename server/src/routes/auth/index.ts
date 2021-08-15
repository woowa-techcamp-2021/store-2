import { Router } from 'express';

import { signIn } from 'controllers/auth';
import { signInValidation } from 'validation/auth';

const router = Router();

router.post('/', signInValidation, signIn);

export default router;
