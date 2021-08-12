import request from './request';
import { ResponseType } from './types';

interface IReqUserInfo {
  username: string;
  password: string;
}

export const register = (data: IReqUserInfo): ResponseType =>
  request('POST', '/api/users', data);

export const login = (data: IReqUserInfo): ResponseType =>
  request('POST', '/api/auth', data);

export const logout = (): ResponseType => request('DELETE', '/api/auth');
