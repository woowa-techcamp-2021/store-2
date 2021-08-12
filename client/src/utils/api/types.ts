export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ResponseType = Promise<ResponseData | Error | null>;

export interface RequestData {}

export interface ResponseData {
  requestAgain: boolean;
  newAccessToken: string;
}
