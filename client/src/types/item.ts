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
}

export interface IItemsData {
  items: IItem[] | null;
  pageCount?: number;
}

export interface IMainItems {
  popularItems: IItem[] | null;
  newItems: IItem[] | null;
  recommendItems: IItem[] | null;
}
