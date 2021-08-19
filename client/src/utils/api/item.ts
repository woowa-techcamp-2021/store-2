import { AxiosResponse } from 'axios';
import { ISearchState, AutoCompleteKeyword } from 'store/item';

import client from './client';

export const getAutoComplete = ({ keyword }: ISearchState): Promise<AxiosResponse<AutoCompleteKeyword>> =>
  client.get(`/api/search?keyword=${keyword}`);
