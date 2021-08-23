import itemRepository, { IItems, IItemsData } from 'repositories/items';
import errorGenerator from 'utils/error/error-generator';
import { getRegExp, engToKor } from 'korean-regexp';

interface IMainItems {
  popularItems: IItems;
  newItems: IItems;
  recommendItems: IItems;
}

export type ItemType = 'recommend' | 'popular' | 'recent' | 'cheap' | 'expensive' | undefined;

async function mainItems(visited: string[]): Promise<IMainItems> {
  const [popularItems, newItems, recommendItems] = await Promise.all([
    itemRepository.getMainItems([['saleCount', 'DESC']], 4),
    itemRepository.getMainItems([['updatedAt', 'DESC']], 8),
    itemRepository.getRecommendItems(visited),
  ]);
  return { popularItems, newItems, recommendItems };
}

async function getItems(categoryId: string, pageId = 1, type: ItemType, search: string): Promise<IItemsData> {
  if (
    (categoryId && search) ||
    (!categoryId && !search) ||
    (categoryId && categoryId.length !== 6) ||
    Number.isNaN(pageId)
  )
    throw errorGenerator({
      message: 'POST /api/item - no exist querystring',
      code: 'item/no-exist-querystring',
    });

  const order = [];
  // TODO: recommend 수정 예정
  if (type === 'recommend') order.push(['saleCount', 'DESC']);
  else if (type === 'popular') order.push(['saleCount', 'DESC']);
  else if (type === 'recent') order.push(['updatedAt', 'DESC']);
  else if (type === 'cheap') order.push(['price', 'ASC']);
  else if (type === 'expensive') order.push(['price', 'DESC']);

  let data;
  if (categoryId) {
    let categoryReg = '';
    if (categoryId === '000000') categoryReg = '';
    else if (categoryId.slice(2, 4) === '00') categoryReg = categoryId.slice(0, 2);
    else categoryReg = categoryId.slice(0, 4);

    data = await itemRepository.getCategoryItems(pageId, order, categoryReg);
  } else {
    const regExp = String(
      getRegExp(engToKor(search), {
        initialSearch: true,
      }),
    );

    data = await itemRepository.getSearchItems(pageId, order, regExp.substring(0, regExp.length - 2).slice(1));
  }
  const { items, totalCount, pageCount } = data;
  return { items, totalCount, pageCount };
}

export default {
  mainItems,
  getItems,
};
