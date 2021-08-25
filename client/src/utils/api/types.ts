import { AxiosResponse } from 'axios';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ResponseType = Promise<AxiosResponse>;

export interface RequestData {}

export interface ResponseData {
  requestAgain: boolean;
  newAccessToken: string;
}
