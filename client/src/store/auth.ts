import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { checkAuthSaga, githubLoginSaga, loginSaga, logoutSaga, signupSaga } from 'saga/auth';

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
    getLoginSuccess: (state, action: PayloadAction<string>) => {
      state.user.userId = action.payload;
      return state;
    },
    getLoginFail: (state, action: PayloadAction<string>) => {
      state.login.error = action.payload;
      return state;
    },
    getSignup: state => state,
    getSignupSuccess: (state, action: PayloadAction<string>) => {
      state.user.userId = action.payload;
      return state;
    },
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

export const {
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

export { authReducer, initialState };

export function* authSaga(): Generator {
  yield takeLatest(getLogin, loginSaga);
  yield takeLatest(getSignup, signupSaga);
  yield takeLatest(getUser, checkAuthSaga);
  yield takeLatest(logout, logoutSaga);
  yield takeLatest(getGithubLogin, githubLoginSaga);
}
