export type IUserId = string | null;

export interface IAuth {
  error: null | string;
}

export interface IUser extends IAuth {
  userId: IUserId;
  token: null | string;
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
  accessToken?: string;
  newAccessToken?: string;
}

export interface IResetToken {
  requestAgain: boolean;
  newAccessToken: string;
}
