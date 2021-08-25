import { Router } from 'express';

import validateToken from 'middlewares/validateToken';
import parseImageFile from 'middlewares/parseImageFile';

import { postReviewValidation } from 'validation/reviews';

import { postReview } from 'controllers/reviews';

const router = Router();

router.post('/', validateToken, parseImageFile, postReviewValidation, postReview);

export default router;
