import { AxiosResponse } from 'axios';
import { IResetToken } from 'types/auth';
import { IOrderList, IOrderState } from 'types/order';
import client from './client';

export const getOrderList = (
  { pageId, prevDate, currentDate }: IOrderState,
  accessToken: string,
): Promise<AxiosResponse> => {
  return client.get<IOrderList | IResetToken>(
    `/api/orders?pageId=${pageId || 1}&prevDate=${prevDate}&currentDate=${currentDate}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
