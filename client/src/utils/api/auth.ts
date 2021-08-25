import { IAuthState, IGithubCode } from 'types/auth';
import request from './request';
import { ResponseType } from './types';

export const login = ({ id, password }: IAuthState): ResponseType => request('POST', '/api/auth', { id, password });

export const signup = ({ id, password }: IAuthState): ResponseType => request('POST', '/api/users', { id, password });

export const logout = (): ResponseType => request('DELETE', '/api/auth');

export const checkAuth = (): ResponseType => request('GET', '/api/auth');

export const githubLogin = ({ code }: IGithubCode): ResponseType => request('POST', '/api/auth/github', { code });
