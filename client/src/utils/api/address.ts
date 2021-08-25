import { AxiosResponse } from 'axios';
import { IListAddress, IAddressState } from 'types/address';
import client from './client';

export const getAddress = (): Promise<AxiosResponse> => client.get<IListAddress[]>('/api/address');

export const addAddress = ({ name, receiver, address }: IAddressState): Promise<AxiosResponse> =>
  client.post<IListAddress[]>('/api/address', { name, receiver, address });
