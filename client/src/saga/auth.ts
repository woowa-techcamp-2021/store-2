import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import * as authAPI from 'utils/api/auth';
import { INNER_ERROR } from 'constants/index';

import { IError } from 'types/error';
import { IAuthState, ICheckUser, IGithubCode, IReceiveServer } from 'types/auth';
import { startLoading, finishLoading } from 'store/loading';
import * as authStore from 'store/auth';

function* loginSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(authStore.getLogin));
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.login, action.payload as unknown as IAuthState)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: authStore.getLoginSuccess,
      payload: userId,
    });
    localStorage.setItem('user', accessToken);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: authStore.getLoginFail,
        payload: errorMessage,
      });
    } else {
      yield put({
        type: authStore.getLoginFail,
        payload: INNER_ERROR,
      });
    }
  } finally {
    yield put(finishLoading(authStore.getLogin));
  }
}

function* signupSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(authStore.getSignup));
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.signup, action.payload as unknown as IAuthState)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: authStore.getSignupSuccess,
      payload: userId,
    });
    localStorage.setItem('user', accessToken);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: authStore.getSignupFail,
        payload: errorMessage,
      });
    } else {
      yield put({
        type: authStore.getSignupFail,
        payload: INNER_ERROR,
      });
    }
  } finally {
    yield put(finishLoading(authStore.getSignup));
  }
}

function* checkAuthSaga(): Generator {
  try {
    yield put(startLoading(authStore.getUser));
    const {
      data: { newAccessToken, userId },
    } = (yield call(authAPI.checkAuth)) as AxiosResponse<ICheckUser>;
    if (newAccessToken) localStorage.setItem('user', newAccessToken);

    yield put({ type: authStore.getUserSuccess, payload: userId });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      localStorage.removeItem('user');
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: authStore.getUserFail, payload: errorMessage });
    } else {
      yield put({
        type: authStore.getUserFail,
        payload: INNER_ERROR,
      });
    }
  } finally {
    yield put(finishLoading(authStore.getUser));
  }
}

function* logoutSaga(): Generator {
  try {
    yield put(startLoading(authStore.logout));
    (yield call(authAPI.logout)) as AxiosResponse<ICheckUser>;
    localStorage.removeItem('user');
    yield put({ type: authStore.logoutSuccess });
    window.location.href = '/';
  } catch (e) {
    if (axios.isAxiosError(e)) {
      localStorage.removeItem('user');
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: authStore.logoutFail, payload: errorMessage });
    } else
      yield put({
        type: authStore.logoutFail,
        payload: INNER_ERROR,
      });
  } finally {
    yield put(finishLoading(authStore.logout));
  }
}

function* githubLoginSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(authStore.getGithubLogin));
    const {
      data: { accessToken, userId },
    } = (yield call(authAPI.githubLogin, action.payload as unknown as IGithubCode)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: authStore.getGithubLoginSuccess,
      payload: userId,
    });
    localStorage.setItem('user', accessToken);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: authStore.getGithubLoginFail,
        payload: errorMessage,
      });
    } else {
      yield put({
        type: authStore.getGithubLoginFail,
        payload: INNER_ERROR,
      });
    }
  } finally {
    yield put(finishLoading(authStore.getGithubLogin));
  }
}

export { loginSaga, signupSaga, checkAuthSaga, logoutSaga, githubLoginSaga };
