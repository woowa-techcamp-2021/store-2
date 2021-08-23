import { createLike, destroyLike } from 'repositories/like';

function addLike(userId: string, itemId: number): Promise<boolean> {
  return createLike(userId, itemId);
}

function deleteLike(userId: string, itemId: number): Promise<boolean> {
  return destroyLike(userId, itemId);
}

export default { addLike, deleteLike };
