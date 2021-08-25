import { AxiosResponse } from 'axios';
import { IAuthState, IReceiveServer, IGithubCode } from 'types/auth';
import client from './client';

export const login = ({ id, password }: IAuthState): Promise<AxiosResponse> =>
  client.post<IReceiveServer>('/api/auth', { id, password });

export const signup = ({ id, password }: IAuthState): Promise<AxiosResponse> =>
  client.post<IReceiveServer>('/api/users', { id, password });

export const logout = (): Promise<AxiosResponse> => client.delete('/api/auth');

export const checkAuth = (token: string): Promise<AxiosResponse> =>
  client.get<IReceiveServer>('/api/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const githubLogin = ({ code }: IGithubCode): Promise<AxiosResponse> =>
  client.post<IReceiveServer>('/api/auth/github', { code });
