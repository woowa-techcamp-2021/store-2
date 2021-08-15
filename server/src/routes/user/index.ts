import { Router } from 'express';

import { signUp } from 'controllers/user';
import { authValidation } from 'validation/auth';

const router = Router();

router.post('/', authValidation, signUp);

export default router;
