import { AxiosResponse } from 'axios';
import { IAddressState, IAddressRemoveState } from 'types/address';
import request from './request';

export const getAddress = (): Promise<AxiosResponse> => request('GET', '/api/address');

export const addAddress = ({ name, receiver, address }: IAddressState): Promise<AxiosResponse> =>
  request<IAddressState>('POST', '/api/address', { name, receiver, address });

export const removeAddress = ({ id }: IAddressRemoveState): Promise<AxiosResponse> =>
  request<{ data: IAddressRemoveState }>('DELETE', '/api/address', { data: { id } });
