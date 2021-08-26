import { AxiosResponse } from 'axios';
import { IAuthState, IGithubCode } from 'types/auth';
import request from './request';

export const login = ({ id, password }: IAuthState): Promise<AxiosResponse> =>
  request<IAuthState>('POST', '/api/auth', { id, password });

export const signup = ({ id, password }: IAuthState): Promise<AxiosResponse> =>
  request<IAuthState>('POST', '/api/users', { id, password });

export const logout = (): Promise<AxiosResponse> => request('DELETE', '/api/auth');

export const checkAuth = (): Promise<AxiosResponse> => request('GET', '/api/auth');

export const githubLogin = ({ code }: IGithubCode): Promise<AxiosResponse> =>
  request<IGithubCode>('POST', '/api/auth/github', { code });
