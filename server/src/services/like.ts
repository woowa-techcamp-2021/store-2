import { createLike, destroyLike, findIsUserLikeItem } from 'repositories/like';

function addLike(userId: string, itemId: number): Promise<boolean> {
  return createLike(userId, itemId);
}

function deleteLike(userId: string, itemId: number): Promise<boolean> {
  return destroyLike(userId, itemId);
}

function isUserLikeItem(userId: string, itemId: number): Promise<boolean> {
  return findIsUserLikeItem(userId, itemId);
}

export default { addLike, deleteLike, isUserLikeItem };
