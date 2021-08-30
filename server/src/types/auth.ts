export interface ISigninReqBody {
  id: string;
  password: string;
}

export interface IGithub {
  code: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface ICheckAuth {
  isAccessTokenExpired: boolean;
  newAccessToken: string;
  userId: string;
}

export interface IHandleGithubAuth {
  isUserExists: boolean;
  userId: string;
}

export interface IGithubAccessToken {
  access_token: string;
}

export interface IGithubId {
  login: string;
}
