import { AxiosResponse } from 'axios';
import { IItemsData, IMainItems, IItemsState } from 'types/item';
import client from './client';

export const getMainItems = (): Promise<AxiosResponse> => {
  const visited = localStorage.getItem('visited') || '';

  return client.post<IMainItems>('/api/items/main', JSON.parse(visited) as string[]);
};

export const getItems = ({ categoryId, pageId, type, search }: IItemsState): Promise<AxiosResponse> => {
  let url = '/api/items?';
  const arr = [];
  if (categoryId) arr.push(`categoryId=${categoryId}&`);
  if (pageId) arr.push(`pageId=${pageId}&`);
  if (type) arr.push(`type=${type}&`);
  if (search) arr.push(`search=${search}&`);
  url += arr.join('');
  url = url.slice(0, url.length - 1);
  return client.get<IItemsData>(url);
};
