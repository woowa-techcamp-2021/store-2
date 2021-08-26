import { Express } from 'express';

import sharp from 'sharp';

import reviewRepository from 'repositories/reviews';

import uploadToS3 from 'utils/uploadToS3';

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

export default {
  postReview,
};
