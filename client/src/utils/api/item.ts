import { AxiosResponse } from 'axios';
import { IItemState } from 'types/item';
import { ISearchState } from 'types/search';
import request from './request';

export const getMainItem = (): Promise<AxiosResponse> => {
  const visited = localStorage.getItem('visited')?.split(',');

  return request<string[]>('POST', '/api/items/main', visited);
};

export const getListItem = ({ categoryId, pageId, type, search }: IItemState): Promise<AxiosResponse> => {
  let url = '/api/items?';
  const visited = localStorage.getItem('visited')?.split(',');

  const arr = [];
  if (categoryId) arr.push(`categoryId=${categoryId}&`);
  if (pageId) arr.push(`pageId=${pageId}&`);
  if (type) arr.push(`type=${type}&`);
  if (search) arr.push(`search=${search}&`);
  url += arr.join('');
  url = url.slice(0, url.length - 1);

  return request<string[]>('POST', url, visited);
};

export const getItem = ({ id }: { id: string }): Promise<AxiosResponse> => request('GET', `/api/items/${id}`);

export const getAutoComplete = ({ keyword }: ISearchState): Promise<AxiosResponse> =>
  request('GET', `/api/search?keyword=${keyword}`);
