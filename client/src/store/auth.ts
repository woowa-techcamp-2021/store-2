import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from 'utils/api/auth';
import { getUserSuccess } from './axios';

export interface ILoginState {
  id: string;
  password: string;
}

export interface IReceiveServer {
  accessToken: string;
  userId: string;
}

interface ILogin {
  loading: boolean;
  error: null | string;
}

interface IUser {
  userId: string | undefined | null;
  loading: boolean;
  error: null | string;
}

interface StateProps {
  login: ILogin;
  user: IUser;
}

interface IError {
  errorMessage: string;
}

const initialState: StateProps = {
  login: {
    loading: false,
    error: null,
  },
  user: {
    userId: undefined,
    loading: false,
    error: null,
  },
};

const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getLogin: state => ({
      ...state,
      login: {
        loading: true,
        error: null,
      },
    }),
    getLoginSuccess: state => ({
      ...state,
      login: {
        loading: false,
        error: null,
      },
    }),
    getLoginFail: (state, action: PayloadAction<string>) => ({
      ...state,
      login: {
        loading: false,
        error: action.payload,
      },
    }),
    getUser: state => ({
      ...state,
      user: {
        userId: undefined,
        loading: true,
        error: null,
      },
    }),
    getUserSuccess: (state, action: PayloadAction<string>) => ({
      ...state,
      user: {
        userId: action.payload,
        loading: false,
        error: null,
      },
    }),
    getUserFail: (state, action: PayloadAction<string>) => ({
      ...state,
      user: {
        userId: null,
        loading: false,
        error: action.payload,
      },
    }),
  },
});

export const { actions, reducer: authReducer } = counterSlice;
const { getLogin, getLoginSuccess, getLoginFail } = actions;
export { getLogin };

function* loginSaga(action: PayloadAction): Generator {
  try {
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.login, action.payload as unknown as ILoginState)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: getLoginSuccess.type,
    });
    localStorage.setItem('user', accessToken);
    yield put({
      type: getUserSuccess.type,
      payload: userId,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: getLoginFail.type,
        payload: errorMessage,
      });
    } else {
      throw new Error('axios saga code error');
    }
  }
}

export function* authSaga(): Generator {
  yield takeLatest(getLogin, loginSaga);
}
