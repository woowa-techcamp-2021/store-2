import { AxiosResponse } from 'axios';
import { IListAddress } from 'types/address';
import client from './client';

export const getAddress = (): Promise<AxiosResponse> => client.get<IListAddress[]>('/api/address');
