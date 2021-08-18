import { AxiosResponse } from 'axios';
import client from './client';

export const getMainItems = (): Promise<AxiosResponse> => client.get('/api/items/main');
