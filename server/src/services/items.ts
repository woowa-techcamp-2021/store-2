import itemRepository, { IItems, IItemsData } from 'repositories/items';
import likeService from 'services/like';

import errorGenerator from 'utils/error/error-generator';
import { getRegExp, engToKor } from 'korean-regexp';
import { ItemAttributes, ItemCreationAttributes } from 'models/item';
import { Model } from 'sequelize';

interface IMainItems {
  popularItems: IItems;
  newItems: IItems;
  recommendItems: IItems;
}

export interface IGetItem {
  thumbnail: string;
  title: string;
  price: number;
  contents: string[];
  salePercent: number;
  isSoldOut: boolean;
  isLike: boolean;
  reviewCount: number;
}

export type ItemType = 'recommend' | 'popular' | 'recent' | 'cheap' | 'expensive' | undefined;

async function mainItems(visited: string[]): Promise<IMainItems> {
  const [popularItems, newItems, recommendItems] = await Promise.all([
    itemRepository.getMainItems([['saleCount', 'DESC']], 4),
    itemRepository.getMainItems([['updatedAt', 'DESC']], 8),
    itemRepository.getRecommendItems(visited, false),
  ]);

  return { popularItems, newItems, recommendItems };
}

async function getItems(
  categoryId: string,
  pageId = 1,
  type: ItemType,
  search: string,
  visited: string[],
): Promise<IItemsData> {
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
  if (type === 'popular') order.push(['saleCount', 'DESC']);
  else if (type === 'recent') order.push(['updatedAt', 'DESC']);
  else if (type === 'cheap') order.push(['price', 'ASC']);
  else if (type === 'expensive') order.push(['price', 'DESC']);

  let data: IItemsData;
  if (categoryId) {
    let categoryReg = '';
    if (categoryId === '000000') categoryReg = '';
    else if (categoryId.slice(2, 4) === '00') categoryReg = categoryId.slice(0, 2);
    else categoryReg = categoryId.slice(0, 4);

    if (type === 'recommend') {
      data = await itemRepository.getCategoryRecommendItems(pageId, categoryReg, visited);
    } else {
      data = await itemRepository.getCategoryItems(pageId, order, categoryReg);
    }
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

async function getItem(id: string): Promise<IGetItem> {
  const item = await itemRepository.getItem(id);

  const itemData: IGetItem = {
    thumbnail: item.getDataValue('thumbnail'),
    title: item.getDataValue('title'),
    price: Number.parseInt(`${item.getDataValue('price')}`, 10),
    salePercent: item.getDataValue('salePercent'),
    contents: JSON.parse(item.getDataValue('contents').replace(/^'|'$/g, '').replace(/'/g, '"')) as string[],
    isSoldOut: item.getDataValue('amount') < 1,
    // TODO: 좋아요
    isLike: true,
    // TODO: 리뷰 갯수
    reviewCount: 0,
  };

  return itemData;
}

async function matchUserLikeItem(
  itemList: Model<ItemAttributes, ItemCreationAttributes>[],
  userId?: string,
): Promise<unknown[]> {
  const result = await Promise.all(
    itemList.map(async item => {
      const itemId = parseInt(item.getDataValue('id'), 10);
      return {
        ...item.toJSON(),
        isLike: userId ? await likeService.isUserLikeItem(userId, itemId) : false,
      };
    }),
  );
  return result;
}

export default {
  mainItems,
  getItems,
  getItem,
  matchUserLikeItem,
};
