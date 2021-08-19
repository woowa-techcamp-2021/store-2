import itemRepository from 'repositories/items';
import { ItemAttributes, ItemCreationAttributes } from 'models/item';
import { Model } from 'sequelize';
import errorGenerator from 'utils/error/error-generator';
import { getRegExp, engToKor } from 'korean-regexp';

async function mainItems(): Promise<Model<ItemAttributes, ItemCreationAttributes>[][]> {
  const items = await Promise.all([
    itemRepository.getMainItems([['sale_count', 'DESC']], 4),
    itemRepository.getMainItems([['updatedAt', 'DESC']], 8),
    itemRepository.getMainItems([['sale_count', 'DESC']], 4),
  ]);
  // TODO 3번째 recommend 수정 예정
  return items;
}

async function getItems(
  categoryId: string,
  pageId = 1,
  type: string,
  search: string,
): Promise<Model<ItemAttributes, ItemCreationAttributes>[]> {
  if (
    (categoryId && search) ||
    (!categoryId && !search) ||
    (categoryId && categoryId.length !== 6) ||
    Number.isNaN(pageId)
  ) {
    throw errorGenerator({
      message: 'POST /api/item - no exist querystring',
      code: 'item/no-exist-querystring',
    });
  }

  const order = [];
  // TODO recommend 수정 예정
  if (type === 'recommend') order.push(['sale_count', 'DESC']);
  else if (type === 'popular') order.push(['sale_count', 'DESC']);
  else if (type === 'recent') order.push(['updatedAt', 'DESC']);
  else if (type === 'cheap') order.push(['price', 'ASC']);
  else if (type === 'expensive') order.push(['price', 'DESC']);

  let items;
  if (categoryId) {
    let categoryReg = '';
    if (categoryReg) {
      if (categoryId.slice(2, 4) === '00') categoryReg = categoryId.slice(0, 2);
      else categoryId.slice(0, 4);
    }
    items = await itemRepository.getCategoryItems(pageId, order, categoryReg);
  } else {
    const regExp = String(
      getRegExp(engToKor(search), {
        initialSearch: true,
      }),
    );
    items = await itemRepository.getSearchItems(pageId, order, regExp.substring(0, regExp.length - 2).slice(1));
  }
  return items;
}

export default {
  mainItems,
  getItems,
};
