import { Router } from 'express';

import { handleGithubAuth, signInGithub } from 'controllers/auth';

const router = Router();

router.post('/', handleGithubAuth);
router.get('/', signInGithub);

export default router;
