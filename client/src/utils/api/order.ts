import { AxiosResponse } from 'axios';

import { IOrderState, IPostOrder } from 'types/order';

import request from './request';

export const getOrderList = ({ pageId, prevDate, currentDate }: IOrderState): Promise<AxiosResponse> =>
  request('GET', `/api/orders?pageId=${pageId || 1}&prevDate=${prevDate}&currentDate=${currentDate}`);

export const postOrder = (orderItems: IPostOrder): Promise<AxiosResponse> => {
  return request('POST', '/api/orders', orderItems);
};
