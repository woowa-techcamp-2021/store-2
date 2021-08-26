import { AxiosResponse } from 'axios';
import request from './request';

export const addLike = (itemId: number): Promise<AxiosResponse> => request('POST', `/api/likes/${itemId}`);

export const deleteLike = (itemId: number): Promise<AxiosResponse> => request('DELETE', `/api/likes/${itemId}`);
