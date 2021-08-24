import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import * as authAPI from 'utils/api/auth';
import { IError } from 'types/error';
import { startLoading, finishLoading } from 'store/loading';
import * as authStore from 'store/auth';

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

function* loginSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(authStore.getLogin.type));
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.login, action.payload as unknown as IAuthState)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: authStore.getLoginSuccess.type,
    });
    localStorage.setItem('user', accessToken);
    yield put({
      type: authStore.getUserSuccess.type,
      payload: userId,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: authStore.getLoginFail.type,
        payload: errorMessage,
      });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(authStore.getLogin.type));
  }
}

function* signupSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(authStore.getSignup.type));
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.signup, action.payload as unknown as IAuthState)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: authStore.getSignupSuccess.type,
    });
    localStorage.setItem('user', accessToken);
    yield put({ type: authStore.getUserSuccess.type, payload: userId });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: authStore.getSignupFail.type,
        payload: errorMessage,
      });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(authStore.getSignup.type));
  }
}

function* checkAuthSaga(): Generator {
  try {
    yield put(startLoading(authStore.getUser.type));
    const {
      data: { newAccessToken, userId },
    } = (yield call(authAPI.checkAuth)) as AxiosResponse<ICheckUser>;
    if (newAccessToken) localStorage.setItem('user', newAccessToken);

    yield put({ type: authStore.getUserSuccess.type, payload: userId });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      localStorage.removeItem('user');
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: authStore.getUserFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(authStore.getUser.type));
  }
}

function* logoutSaga(): Generator {
  try {
    yield put(startLoading(authStore.logout.type));
    (yield call(authAPI.logout)) as AxiosResponse<ICheckUser>;
    localStorage.removeItem('user');
    yield put({ type: authStore.logoutSuccess.type });
    window.location.href = '/';
  } catch (e) {
    if (axios.isAxiosError(e)) {
      localStorage.removeItem('user');
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: authStore.logoutFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(authStore.logout.type));
  }
}

function* githubLoginSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(authStore.getGithubLogin.type));
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.githubLogin, action.payload as unknown as IGithubCode)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: authStore.getGithubLoginSuccess.type,
    });
    localStorage.setItem('user', accessToken);
    yield put({ type: authStore.getUserSuccess.type, payload: userId });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: authStore.getGithubLoginFail.type,
        payload: errorMessage,
      });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(authStore.getGithubLogin.type));
  }
}

export { loginSaga, signupSaga, checkAuthSaga, logoutSaga, githubLoginSaga };
