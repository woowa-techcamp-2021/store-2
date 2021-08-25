import { AxiosResponse } from 'axios';
import { IOrderList, IOrderState, IPostOrder } from 'types/order';
import client from './client';

export const getOrderList = ({ pageId, prevDate, currentDate }: IOrderState): Promise<AxiosResponse> => {
  return client.get<IOrderList>(`/api/orders?pageId=${pageId || 1}&prevDate=${prevDate}&currentDate=${currentDate}`);
};

export const postOrder = (orderItems: IPostOrder): Promise<AxiosResponse> => {
  return client.post<IOrderList>('/api/orders', orderItems);
};
