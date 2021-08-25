import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import * as authAPI from 'utils/api/auth';
import { IError } from 'types/error';
import { startLoading, finishLoading } from 'store/loading';
import * as authStore from 'store/auth';
import { IAuthState, IGithubCode, IReceiveServer } from 'types/auth';

function* loginSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(authStore.getLogin));
    const { data } = (yield call(
      authAPI.login,
      action.payload as unknown as IAuthState,
    )) as AxiosResponse<IReceiveServer>;
    yield put({ type: authStore.getLoginSuccess });
    yield put({
      type: authStore.getUserSuccess,
      payload: data,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: authStore.getLoginFail,
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
    yield put(startLoading(authStore.getSignup));
    const { data } = (yield call(
      authAPI.signup,
      action.payload as unknown as IAuthState,
    )) as AxiosResponse<IReceiveServer>;
    yield put({
      type: authStore.getSignupSuccess,
    });
    yield put({ type: authStore.getUserSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: authStore.getSignupFail,
        payload: errorMessage,
      });
    } else {
      throw new Error(e);
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
    } = (yield call(authAPI.checkAuth, localStorage.getItem('user') || '')) as AxiosResponse<IReceiveServer>;

    yield put({ type: authStore.getUserSuccess, payload: { userId, newAccessToken } });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: authStore.getUserFail, payload: errorMessage });
    } else {
      throw new Error(e);
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
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(authStore.logout));
  }
}

function* githubLoginSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(authStore.getGithubLogin));
    const { data } = (yield call(
      authAPI.githubLogin,
      action.payload as unknown as IGithubCode,
    )) as AxiosResponse<IReceiveServer>;
    yield put({ type: authStore.getGithubLoginSuccess });
    yield put({ type: authStore.getUserSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: authStore.getGithubLoginFail,
        payload: errorMessage,
      });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(authStore.getGithubLogin));
  }
}

export { loginSaga, signupSaga, checkAuthSaga, logoutSaga, githubLoginSaga };
