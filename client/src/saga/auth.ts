import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import * as authAPI from 'utils/api/auth';
import { INNER_ERROR } from 'constants/index';

import { IError } from 'types/error';
import { IAuthState, IGithubCode, IReceiveServer } from 'types/auth';
import { startLoading, finishLoading } from 'store/loading';
import * as authStore from 'store/auth';

function* loginSaga(action: PayloadAction<IAuthState>): Generator {
  try {
    yield put(startLoading(authStore.getLogin));
    const { data } = (yield call(authAPI.login, action.payload)) as AxiosResponse<IReceiveServer>;
    yield put({ type: authStore.getLoginSuccess, payload: data });
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

function* signupSaga(action: PayloadAction<IAuthState>): Generator {
  try {
    yield put(startLoading(authStore.getSignup));
    const { data } = (yield call(authAPI.signup, action.payload)) as AxiosResponse<IReceiveServer>;
    yield put({
      type: authStore.getSignupSuccess,
      payload: data,
    });
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
    const { data } = (yield call(
      authAPI.checkAuth,
      localStorage.getItem('user') || '',
    )) as AxiosResponse<IReceiveServer>;

    yield put({ type: authStore.getUserSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
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
    yield call(authAPI.logout);
    yield put({ type: authStore.logoutSuccess });
    window.location.href = '/';
  } catch (e) {
    if (axios.isAxiosError(e)) {
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

function* githubLoginSaga(action: PayloadAction<IGithubCode>): Generator {
  try {
    yield put(startLoading(authStore.getGithubLogin));
    const { data } = (yield call(authAPI.githubLogin, action.payload)) as AxiosResponse<IReceiveServer>;
    yield put({ type: authStore.getGithubLoginSuccess, payload: data });
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
