import { AxiosResponse } from 'axios';
import { IMainItem, IListItem, IItemState } from 'types/item';
import { ISearchState, AutoCompleteKeyword } from 'types/search';
import client from './client';

export const getMainItem = (): Promise<AxiosResponse> => {
  const visited = localStorage.getItem('visited')?.split(',');

  return client.post<IMainItem>('/api/items/main', visited);
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
  return client.post<IListItem>(url, visited);
};

export const getItem = ({ id }: { id: string }): Promise<AxiosResponse> => client.get(`/api/items/${id}`);

export const getAutoComplete = ({ keyword }: ISearchState): Promise<AxiosResponse<AutoCompleteKeyword>> =>
  client.get(`/api/search?keyword=${keyword}`);
