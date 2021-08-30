import { createLike, destroyLike, findIsUserLikeItem } from 'repositories/like';

async function addLike(userId: string, itemId: number): Promise<void> {
  await createLike(userId, itemId);
}

async function deleteLike(userId: string, itemId: number): Promise<void> {
  await destroyLike(userId, itemId);
}

async function isUserLikeItem(userId: string, itemId: number): Promise<boolean> {
  const isLike = await findIsUserLikeItem(userId, itemId);

  return isLike;
}

export default { addLike, deleteLike, isUserLikeItem };
