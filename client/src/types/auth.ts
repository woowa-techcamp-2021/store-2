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
