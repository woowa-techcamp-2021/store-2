import itemRepository from 'repositories/item';
import { ItemAttribures, ItemCreationAttributes } from 'models/item';
import { Model } from 'sequelize';
import errorGenerator from 'utils/error/error-generator';

async function mainItems(): Promise<Model<ItemAttribures, ItemCreationAttributes>[][]> {
  const items = await Promise.all([
    itemRepository.getMainItems([['sale_count', 'DESC']], 4),
    itemRepository.getMainItems([['updatedAt', 'DESC']], 8),
    itemRepository.getMainItems([['sale_count', 'DESC']], 4),
  ]);
  // 3번째 recommend 수정 예정
  return items;
}

async function categoryItems(
  categoryId: string,
  pageId = 1,
  type: string,
): Promise<Model<ItemAttribures, ItemCreationAttributes>[]> {
  if (!(categoryId && type) && !['recommend', 'popular', 'recent ', 'cheap', 'expensive'].includes(type))
    throw errorGenerator({
      message: 'POST /api/item - no exist querystring',
      code: 'item/no-exist-querystring',
    });
  const order = [];
  //  recommend 수정 예정
  if (type === 'recommend') order.push(['sale_count', 'DESC']);
  else if (type === 'popular') order.push(['sale_count', 'DESC']);
  else if (type === 'recent') order.push(['updatedAt', 'DESC']);
  else if (type === 'cheap') order.push(['price', 'ASC']);
  else if (type === 'expensive') order.push(['price', 'DESC']);
  const items = await itemRepository.getCategoryItems(categoryId, pageId, order);
  return items;
}

export default {
  mainItems,
  categoryItems,
};
