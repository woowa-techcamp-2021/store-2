import { AxiosResponse } from 'axios';
import { IResetToken } from 'types/auth';
import client from './client';

export const addLike = (itemId: number, accessToken: string): Promise<AxiosResponse> =>
  client.post<string | IResetToken>(`/api/likes/${itemId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const deleteLike = (itemId: number, accessToken: string): Promise<AxiosResponse> =>
  client.delete<string | IResetToken>(`/api/likes/${itemId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
