import { IItemState } from 'types/item';
import { ISearchState } from 'types/search';
import request from './request';
import { ResponseType } from './types';

export const getMainItem = (): ResponseType => {
  const visited = localStorage.getItem('visited')?.split(',');

  return request('POST', '/api/items/main', visited);
};

export const getListItem = ({ categoryId, pageId, type, search }: IItemState): ResponseType => {
  let url = '/api/items?';
  const visited = localStorage.getItem('visited')?.split(',');

  const arr = [];
  if (categoryId) arr.push(`categoryId=${categoryId}&`);
  if (pageId) arr.push(`pageId=${pageId}&`);
  if (type) arr.push(`type=${type}&`);
  if (search) arr.push(`search=${search}&`);
  url += arr.join('');
  url = url.slice(0, url.length - 1);

  return request('POST', url, visited);
};

export const getItem = ({ id }: { id: string }): ResponseType => request('GET', `/api/items/${id}`);

export const getAutoComplete = ({ keyword }: ISearchState): ResponseType =>
  request('GET', `/api/search?keyword=${keyword}`);
