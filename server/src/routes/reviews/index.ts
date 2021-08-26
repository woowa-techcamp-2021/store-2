import { Router } from 'express';

import validateToken from 'middlewares/validateToken';
import parseImageFile from 'middlewares/parseImageFile';

import { postReviewValidation, getReviewsValidation } from 'validation/reviews';

import { postReview, getReviews } from 'controllers/reviews';

const router = Router();

router.post('/', validateToken, parseImageFile, postReviewValidation, postReview);
router.get('/', getReviewsValidation, getReviews);

export default router;
