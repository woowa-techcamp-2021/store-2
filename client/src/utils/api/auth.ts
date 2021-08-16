import { AxiosResponse } from 'axios';
import { ILoginState, IReceiveServer } from 'store/auth';
import { IUser } from 'store/axios';
import client from './client';
// import request from './request';
// import { ResponseType } from './types';

// interface IReqUserInfo {
//   username: string;
//   password: string;
// }

// data넘겨줄때는 객체로 넘겨주기   -- 나중에 주석삭제할게요

// export const register = (data: IReqUserInfo): ResponseType => request('POST', '/api/users', data);

// export const login = (data: IReqUserInfo): ResponseType => request('POST', '/api/auth', data);

// export const logout = (): ResponseType => request('DELETE', '/api/auth');

// 회원가입 pr때 주석 전부 삭제할게요 테스트 참고할게 많아서...

export const check = (): Promise<AxiosResponse> => client.get<IUser>('/api/test/check');

export const login = ({ id, password }: ILoginState): Promise<AxiosResponse> =>
  client.post<IReceiveServer>('/api/auth', { id, password });
