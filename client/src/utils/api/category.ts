import { AxiosResponse } from 'axios';
import client from './client';

export const getCategories = (): Promise<AxiosResponse> => client.get('/api/categories');
