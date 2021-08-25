import { AxiosResponse } from 'axios';
import { IListAddress, IAddressState, IAddressRemoveState } from 'types/address';
import client from './client';

export const getAddress = (): Promise<AxiosResponse> => client.get<IListAddress[]>('/api/address');

export const addAddress = ({ name, receiver, address }: IAddressState): Promise<AxiosResponse> =>
  client.post<IListAddress[]>('/api/address', { name, receiver, address });

export const removeAddress = ({ id }: IAddressRemoveState): Promise<AxiosResponse> =>
  client.delete<IListAddress[]>('/api/address', { data: { id } });
