import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from 'utils/api/auth';

export interface ILoginState {
  id: string;
  password: string;
}

export interface IToken {
  accessToken: string;
}

interface ILogin {
  loading: boolean;
  error: null | string;
}

export interface StateProps {
  login: ILogin;
}

interface IError {
  errorMessage: string;
}

const initialState: StateProps = {
  login: {
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
  },
});

export const { actions, reducer: authReducer } = counterSlice;
export const { getLogin, getLoginSuccess, getLoginFail } = actions;

function* loginSaga(action: PayloadAction): Generator {
  try {
    const {
      data: { accessToken },
    } = (yield call(authAPI.login, action.payload as unknown as ILoginState)) as AxiosResponse<IToken>;
    yield put({
      type: getLoginSuccess.type,
    });
    localStorage.setItem('user', accessToken);
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
