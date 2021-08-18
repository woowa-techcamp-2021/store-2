import { Router } from 'express';

import auth from './auth';
import users from './users';
import categories from './categories';
import search from './search';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/categories', categories);
router.use('/search', search);
export default router;
