import { db } from 'models';

const postReview = async (
  uid: string,
  itemId: number,
  title: string,
  contents: string,
  score: number,
  imgUrl: string,
): Promise<void> => {
  await db.Review.create({
    title,
    contents,
    score,
    imgUrl,
    ItemId: itemId,
    UserId: uid,
  });
};

export default { postReview };
