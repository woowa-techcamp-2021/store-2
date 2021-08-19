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
