import { AxiosResponse } from 'axios';
import { IOrderState } from 'types/order';
import request from './request';

export const getOrderList = ({ pageId, prevDate, currentDate }: IOrderState): Promise<AxiosResponse> =>
  request('GET', `/api/orders?pageId=${pageId || 1}&prevDate=${prevDate}&currentDate=${currentDate}`);
