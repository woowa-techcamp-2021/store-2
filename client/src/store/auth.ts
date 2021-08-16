import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from 'utils/api/auth';

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

interface IAuth {
  loading: boolean;
  error: null | string;
}

interface IUser {
  userId: string | undefined | null;
  loading: boolean;
  error: null | string;
}

interface StateProps {
  login: IAuth;
  signup: IAuth;
  user: IUser;
  logout: IAuth;
}

interface IError {
  errorMessage: string;
}

const initialState: StateProps = {
  login: {
    loading: false,
    error: null,
  },
  signup: {
    loading: false,
    error: null,
  },
  user: {
    userId: undefined,
    loading: false,
    error: null,
  },
  logout: {
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
    getSignup: state => ({
      ...state,
      signup: {
        loading: true,
        error: null,
      },
    }),
    getSignupSuccess: state => ({
      ...state,
      signup: {
        loading: false,
        error: null,
      },
    }),
    getSignupFail: (state, action: PayloadAction<string>) => ({
      ...state,
      signup: {
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
    logout: state => ({
      ...state,
      logout: {
        loading: true,
        error: null,
      },
    }),
    logoutSuccess: state => ({
      ...state,
      user: {
        ...state.user,
        userId: null,
      },
      logout: {
        loading: true,
        error: null,
      },
    }),
    logoutFail: (state, action: PayloadAction<string>) => ({
      ...state,
      logout: {
        loading: true,
        error: action.payload,
      },
    }),
  },
});

export const { actions, reducer: authReducer } = counterSlice;
const {
  getLogin,
  getLoginSuccess,
  getLoginFail,
  getSignup,
  getSignupSuccess,
  getSignupFail,
  getUser,
  getUserSuccess,
  getUserFail,
  logout,
  logoutSuccess,
  logoutFail,
} = actions;
export { getLogin, getSignup, getUser, logout };

function* loginSaga(action: PayloadAction): Generator {
  try {
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.login, action.payload as unknown as IAuthState)) as AxiosResponse<IReceiveServer>;
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
      throw new Error(e);
    }
  }
}

function* signupSaga(action: PayloadAction): Generator {
  try {
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.signup, action.payload as unknown as IAuthState)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: getSignupSuccess.type,
    });
    localStorage.setItem('user', accessToken);
    yield put({ type: getUserSuccess.type, payload: userId });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: getSignupFail.type,
        payload: errorMessage,
      });
    } else {
      throw new Error(e);
    }
  }
}

function* checkAuth(): Generator {
  try {
    const {
      data: { newAccessToken, userId },
    } = (yield call(authAPI.checkAuth)) as AxiosResponse<ICheckUser>;

    if (newAccessToken) localStorage.setItem('user', newAccessToken);

    yield put({ type: getUserSuccess.type, payload: userId });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      localStorage.removeItem('user');
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getUserFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  }
}

function* logoutSaga(): Generator {
  try {
    (yield call(authAPI.logout)) as AxiosResponse<ICheckUser>;
    localStorage.removeItem('user');
    yield put({ type: logoutSuccess.type });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      localStorage.removeItem('user');
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: logoutFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  }
}

export function* authSaga(): Generator {
  yield takeLatest(getLogin, loginSaga);
  yield takeLatest(getSignup, signupSaga);
  yield takeLatest(getUser, checkAuth);
  yield takeLatest(logout, logoutSaga);
}
