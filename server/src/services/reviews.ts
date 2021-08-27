import { Express } from 'express';

import sharp from 'sharp';

import reviewRepository from 'repositories/reviews';
import orderRepository from 'repositories/orders';

import uploadToS3 from 'utils/uploadToS3';
import errorGenerator from 'utils/error/error-generator';

import { IReview } from 'types/reviews';

const LIMIT_COUNT = 10;

async function postReview(
  uid: string,
  itemId: number,
  title: string,
  contents: string,
  score: number,
  image: Express.Multer.File | undefined,
): Promise<IReview> {
  let imgUrl = '';

  const isPaid = await orderRepository.checkPaidUser(uid, itemId);

  if (!isPaid) {
    throw errorGenerator({
      code: 'reviews/user-not-paid',
      message: 'POST /api/reviews - need to buy item',
      customMessage: '상품을 구매한 사용자만 후기를 작성할 수 있습니다',
    });
  }

  if (image) {
    const resizedImageBuffer = await sharp(image.buffer).resize(300, 300, { fit: 'cover' }).jpeg().toBuffer();

    const imageLocation = await uploadToS3({
      Bucket: process.env.AWS_BUCKET || '',
      Key: `reviews/${itemId}-${Date.now().toString()}.jpg`,
      Body: resizedImageBuffer,
      ACL: 'public-read',
      ContentType: 'image/jpeg',
    });
    imgUrl = imageLocation;
  }

  const { reviewData, totalCount } = await reviewRepository.postReview(uid, itemId, title, contents, score, imgUrl);

  const reviews = reviewData.map(review => {
    return {
      title: review.getDataValue('title'),
      score: review.getDataValue('score'),
      contents: review.getDataValue('contents'),
      imgUrl: review.getDataValue('imgUrl'),
      userId: review.getDataValue('userId'),
    };
  });

  const pageCount = Math.ceil(totalCount / LIMIT_COUNT);

  return {
    reviews,
    totalCount,
    pageCount,
  };
}

async function getReviews(itemId: number, pageId: number): Promise<IReview> {
  const { reviewData, totalCount } = await reviewRepository.getReviews(itemId, pageId);

  const reviews = reviewData.map(review => {
    return {
      title: review.getDataValue('title'),
      score: review.getDataValue('score'),
      contents: review.getDataValue('contents'),
      imgUrl: review.getDataValue('imgUrl'),
      userId: review.getDataValue('userId'),
    };
  });

  const pageCount = Math.ceil(totalCount / LIMIT_COUNT);

  return {
    reviews,
    totalCount,
    pageCount,
  };
}

export default {
  postReview,
  getReviews,
};
