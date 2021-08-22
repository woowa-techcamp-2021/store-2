import { AxiosResponse } from 'axios';
import { IItem } from 'types/item';
import { IItemsState } from 'store/items';
import client from './client';

export const getMainItems = (): Promise<AxiosResponse> => client.get('/api/items/main');

export const getItems = ({ categoryId, pageId, type, search }: IItemsState): Promise<AxiosResponse> => {
  let url = '/api/items?';
  const arr = [];
  if (categoryId) arr.push(`categoryId=${categoryId}&`);
  if (pageId) arr.push(`pageId=${pageId}&`);
  if (type) arr.push(`type=${type}&`);
  if (search) arr.push(`search=${search}&`);
  url += arr.join('');
  url = url.slice(0, url.length - 1);
  return client.get<IItem>(url);
};

export const getItem = ({ id }: { id: string }): Promise<AxiosResponse> => client.get(`/api/items/${id}`);
