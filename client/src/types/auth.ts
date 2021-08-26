export type IUserId = string | null;

export interface IAuth {
  error: null | string;
}

export interface IUser extends IAuth {
  userId: IUserId;
}

export interface IAuthState {
  id: string;
  password: string;
}

export interface IGithubCode {
  code: string;
}

export interface IReceiveServer {
  userId: string;
  accessToken: string;
}
