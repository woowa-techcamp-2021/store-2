import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from 'utils/api/auth';
import { IError } from 'types/error';
import { startLoading, finishLoading } from 'store/loading';

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

interface IAuth {
  error: null | string;
}

interface IUser {
  userId: string | null;
  error: null | string;
}

interface StateProps {
  login: IAuth;
  signup: IAuth;
  user: IUser;
  logout: IAuth;
  githubSignup: IAuth;
}

const initialState: StateProps = {
  login: {
    error: null,
  },
  signup: {
    error: null,
  },
  user: {
    userId: null,
    error: null,
  },
  logout: {
    error: null,
  },
  githubSignup: {
    error: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getLogin: state => state,
    getLoginSuccess: state => state,
    getLoginFail: (state, action: PayloadAction<string>) => {
      state.login.error = action.payload;
      return state;
    },
    getSignup: state => state,
    getSignupSuccess: state => state,
    getSignupFail: (state, action: PayloadAction<string>) => {
      state.signup.error = action.payload;
      return state;
    },
    getUser: state => state,
    getUserSuccess: (state, action: PayloadAction<string>) => {
      state.user.userId = action.payload;
      return state;
    },
    getUserFail: (state, action: PayloadAction<string>) => {
      state.user.error = action.payload;
      return state;
    },
    logout: state => state,
    logoutSuccess: state => {
      state.user.userId = null;
      return state;
    },
    logoutFail: (state, action: PayloadAction<string>) => {
      state.logout.error = action.payload;
      return state;
    },
    getLoginReset: state => {
      state.login.error = null;
      return state;
    },
    getSignupReset: state => {
      state.signup.error = null;
      return state;
    },
    getGithubLogin: state => state,
    getGithubLoginSuccess: (state, action: PayloadAction<string>) => {
      state.user.userId = action.payload;
      return state;
    },
    getGithubLoginFail: (state, action: PayloadAction<string>) => {
      state.signup.error = action.payload;
      return state;
    },
  },
});

const { actions, reducer: authReducer } = authSlice;
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
  getLoginReset,
  getSignupReset,
  getGithubLogin,
  getGithubLoginSuccess,
  getGithubLoginFail,
} = actions;
export { authReducer, getLogin, getSignup, getUser, logout, getLoginReset, getSignupReset, getGithubLogin };

function* loginSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getLogin.type));
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
  } finally {
    yield put(finishLoading(getLogin.type));
  }
}

function* signupSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getSignup.type));
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
  } finally {
    yield put(finishLoading(getSignup.type));
  }
}

function* checkAuth(): Generator {
  try {
    yield put(startLoading(getUser.type));
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
  } finally {
    yield put(finishLoading(getUser.type));
  }
}

function* logoutSaga(): Generator {
  try {
    yield put(startLoading(logout.type));
    (yield call(authAPI.logout)) as AxiosResponse<ICheckUser>;
    localStorage.removeItem('user');
    yield put({ type: logoutSuccess.type });
    window.location.href = '/';
  } catch (e) {
    if (axios.isAxiosError(e)) {
      localStorage.removeItem('user');
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: logoutFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(logout.type));
  }
}

function* githubLoginSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getGithubLogin.type));
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.githubLogin, action.payload as unknown as IGithubCode)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: getGithubLoginSuccess.type,
    });
    localStorage.setItem('user', accessToken);
    yield put({ type: getUserSuccess.type, payload: userId });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: getGithubLoginFail.type,
        payload: errorMessage,
      });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getGithubLogin.type));
  }
}

export function* authSaga(): Generator {
  yield takeLatest(getLogin, loginSaga);
  yield takeLatest(getSignup, signupSaga);
  yield takeLatest(getUser, checkAuth);
  yield takeLatest(logout, logoutSaga);
  yield takeLatest(getGithubLogin, githubLoginSaga);
}
