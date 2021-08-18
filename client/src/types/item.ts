export interface IItem {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  isBest?: boolean;
  isGreen?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  salePercent?: number;
  originalPrice?: number;
}
