import { AxiosResponse } from 'axios';
import client from './client';

export const addLike = (itemId: number): Promise<AxiosResponse> => client.post(`/api/likes/${itemId}`);

export const deleteLike = (itemId: number): Promise<AxiosResponse> => client.delete(`/api/likes/${itemId}`);
