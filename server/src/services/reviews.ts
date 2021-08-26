import { Express } from 'express';

import sharp from 'sharp';

import reviewRepository from 'repositories/reviews';

import uploadToS3 from 'utils/uploadToS3';

import { IReview } from 'types/reviews';

const LIMIT_COUNT = 10;

async function postReview(
  uid: string,
  itemId: number,
  title: string,
  contents: string,
  score: number,
  image: Express.Multer.File | undefined,
): Promise<string> {
  let imgUrl = '';

  if (image) {
    const resizedImageBuffer = await sharp(image.buffer).resize(300, 300, { fit: 'cover' }).jpeg().toBuffer();

    const imageLocation = await uploadToS3({
      Bucket: process.env.AWS_BUCKET || '',
      Key: `reviews/${itemId}-${Date.now().toString()}.jpg`,
      Body: resizedImageBuffer,
      ACL: 'public-read',
    });
    imgUrl = imageLocation;
  }

  await reviewRepository.postReview(uid, itemId, title, contents, score, imgUrl);

  return imgUrl;
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
