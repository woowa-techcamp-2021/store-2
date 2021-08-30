import { Router } from 'express';

import { signIn, checkAuth, signOut } from 'controllers/auth';
import { authValidation } from 'validation/auth';

import github from './github';

const router = Router();

router.use('/github', github);

router.post('/', authValidation, signIn);
router.get('/', checkAuth);
router.delete('/', signOut);

export default router;
