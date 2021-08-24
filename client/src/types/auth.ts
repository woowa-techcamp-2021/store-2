export type IUserId = string | null;

export interface IUser {
  userId: IUserId;
}

export interface IAuth {
  loading: boolean;
  error: null | string;
  userId: IUserId;
  userLoading: boolean;
}

export interface IAuthState {
  id: string;
  password: string;
}

export interface IReceiveServer {
  accessToken: string;
  userId: string;
}

export interface ICheckUser {
  newAccessToken?: string;
  userId: string;
}

export interface IGithubCode {
  code: string;
}
