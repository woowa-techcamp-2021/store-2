export interface IOrder {
  createdAt: string;
  thumbnail: string;
  title: string;
  status: string;
  price: number;
  count: number;
}

export interface IOrderList {
  orders: IOrder[];
  totalCount: number;
  pageCount: number;
}

export interface IOrderState {
  pageId?: number;
  prevDate: string;
  currentDate: string;
}
