export interface IItem {
  id: number;
  thumbnail: string;
  title: string;
  price: string;
  isBest?: boolean;
  isGreen: boolean;
  isNew?: boolean;
  salePercent: number;
  originalPrice?: number;
  isLike: boolean;
}

export interface IListItem {
  items: IItem[];
  totalCount: number;
  pageCount: number;
}

export interface IMainItem {
  popularItems: IItem[];
  newItems: IItem[];
  recommendItems: IItem[];
}

export interface IItemState {
  categoryId?: string;
  pageId?: number;
  type?: string;
  search?: string;
}

export enum ESortType {
  RECOMMEND = 'recommend',
  POPULAR = 'popular',
  RECENT = 'recent',
  CHEAP = 'cheap',
  EXPENSIVE = 'expensive',
}

export interface IItemDetail {
  thumbnail: string;
  title: string;
  price: number;
  originalPrice: number;
  contents: string[];
  salePercent: number;
  isSoldOut: boolean;
  isLike: boolean;
  reviewCount: number;
  isPaid: boolean;
}
