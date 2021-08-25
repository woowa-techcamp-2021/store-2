import { Router } from 'express';

import auth from './auth';
import users from './users';
import categories from './categories';
import search from './search';
import items from './items';
import orders from './orders';
import address from './address';
import reviews from './reviews';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/categories', categories);
router.use('/search', search);
router.use('/items', items);
router.use('/orders', orders);
router.use('/address', address);
router.use('/reviews', reviews);

export default router;
