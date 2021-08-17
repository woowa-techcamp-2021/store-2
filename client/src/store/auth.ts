import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from 'utils/api/auth';
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
}

interface IError {
  errorMessage: string;
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
};

const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getLogin: state => state,
    getLoginSuccess: state => state,
    getLoginFail: (state, action: PayloadAction<string>) => {
      state.login.error = action.payload;
      return state;
    },
    // ({
    //   ...state,
    //   login: {
    //     error: action.payload,
    //   },
    // }),
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
    //   ...state,
    //   user: {
    //     userId: action.payload,
    //     error: null,
    //   },
    // }),
    getUserFail: (state, action: PayloadAction<string>) => {
      state.user.error = action.payload;
      return state;
    },
    // ({
    //   ...state,
    //   user: {
    //     userId: null,
    //     error: action.payload,
    //   },
    // }),
    logout: state => state,
    logoutSuccess: state => {
      state.user.userId = null;
      return state;
    },
    logoutFail: (state, action: PayloadAction<string>) => {
      state.logout.error = action.payload;
      return state;
    },
    // ({
    //   ...state,
    //   logout: {
    //     error: action.payload,
    //   },
    // }),
    getLoginRest: state => {
      state.login.error = null;
      return state;
    },
    getSignupRest: state => {
      state.signup.error = null;
      return state;
    },
  },
});

const { actions, reducer: authReducer } = counterSlice;
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
  getLoginRest,
  getSignupRest,
} = actions;
export { authReducer, getLogin, getSignup, getUser, logout, getLoginRest, getSignupRest };

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

export function* authSaga(): Generator {
  yield takeLatest(getLogin, loginSaga);
  yield takeLatest(getSignup, signupSaga);
  yield takeLatest(getUser, checkAuth);
  yield takeLatest(logout, logoutSaga);
}
