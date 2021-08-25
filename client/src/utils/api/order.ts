import { IOrderState } from 'types/order';
import request from './request';
import { ResponseType } from './types';

export const getOrderList = ({ pageId, prevDate, currentDate }: IOrderState): ResponseType =>
  request('GET', `/api/orders?pageId=${pageId || 1}&prevDate=${prevDate}&currentDate=${currentDate}`);
