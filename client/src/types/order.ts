export interface IOrder {
  itemId: number;
  createdAt: string;
  id: number;
  thumbnail: string;
  title: string;
  status: string;
  price: number;
  quantity: number;
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

export interface IPostOrder {
  user: string;
  phone: string;
  address: string;
  receiver: string;
  itemList: { itemId: number; quantity: number }[];
}

export interface IOrderItem {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
}
