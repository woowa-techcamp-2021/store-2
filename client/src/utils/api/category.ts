import { AxiosResponse } from 'axios';
import request from './request';

export const getCategories = (): Promise<AxiosResponse> => request('GET', '/api/categories');
