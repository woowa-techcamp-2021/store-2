import { AxiosResponse } from 'axios';
import { IItem } from 'types/item';
import { IItemsState } from 'store/items';
import client from './client';

export const getMainItems = (): Promise<AxiosResponse> => client.get('/api/items/main');

export const getCategoryItems = ({ categoryId, pageId = 1, type }: IItemsState): Promise<AxiosResponse> =>
  client.get<IItem>(`/api/items/category?categoryId=${categoryId}&pageId=${pageId}&type=${type}`);
