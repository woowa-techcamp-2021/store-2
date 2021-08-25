import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { IAuthState, IGithubCode } from 'types/auth';

import * as authAPI from 'utils/api/auth';
import { INNER_ERROR } from 'constants/index';

import { finishLoading, startLoading } from 'store/loading';
import * as authStore from 'store/auth';
import * as authSaga from '../auth';

const data = { accessToken: 'token', userId: 'guest' };
const account = { id: 'guest', password: 'guest' };

describe('Login Saga', () => {
  const action = {
    payload: account,
  };

  it('should success', () => {
    try {
      return expectSaga(authSaga.loginSaga, action as unknown as PayloadAction<IAuthState>)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.getLogin))
        .provide([[call(authAPI.login, action.payload), { data }]])
        .put({ type: authStore.getLoginSuccess, payload: data })
        .put(finishLoading(authStore.getLogin))
        .hasFinalState({
          ...authStore.initialState,
          user: { ...authStore.initialState.user, userId: data.userId, token: data.accessToken },
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail', () => {
    try {
      return expectSaga(authSaga.loginSaga, action as unknown as PayloadAction<IAuthState>)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.getLogin))
        .provide([[call(authAPI.login, action.payload), throwError()]])
        .put({ type: authStore.getLoginFail, payload: INNER_ERROR })
        .put(finishLoading(authStore.getLogin))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});

describe('Signup Saga', () => {
  const action = {
    payload: account,
  };

  it('should success', () => {
    try {
      return expectSaga(authSaga.signupSaga, action as unknown as PayloadAction<IAuthState>)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.getSignup))
        .provide([[call(authAPI.signup, action.payload), { data }]])
        .put({ type: authStore.getSignupSuccess, payload: data })
        .put(finishLoading(authStore.getSignup))
        .hasFinalState({
          ...authStore.initialState,
          user: { ...authStore.initialState.user, userId: data.userId, token: data.accessToken },
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail', () => {
    try {
      return expectSaga(authSaga.signupSaga, action as unknown as PayloadAction<IAuthState>)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.getSignup))
        .provide([[call(authAPI.signup, action.payload), throwError()]])
        .put({ type: authStore.getSignupFail, payload: INNER_ERROR })
        .put(finishLoading(authStore.getSignup))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});

describe('CheckAuth Saga', () => {
  it('should success', () => {
    try {
      return expectSaga(authSaga.checkAuthSaga)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.getUser))
        .provide([[call(authAPI.checkAuth, localStorage.getItem('user') || ''), { data }]])
        .put({ type: authStore.getUserSuccess, payload: data })
        .put(finishLoading(authStore.getUser))
        .hasFinalState({
          ...authStore.initialState,
          user: { ...authStore.initialState.user, userId: data.userId, token: data.accessToken },
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail', () => {
    try {
      return expectSaga(authSaga.checkAuthSaga)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.getUser))
        .provide([[call(authAPI.checkAuth, localStorage.getItem('user') || ''), throwError()]])
        .put({ type: authStore.getUserFail, payload: INNER_ERROR })
        .put(finishLoading(authStore.getUser))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});

describe('Logout Saga', () => {
  it('should success', () => {
    try {
      return expectSaga(authSaga.logoutSaga)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.logout))
        .provide([[call(authAPI.logout), '']])
        .put({ type: authStore.logoutSuccess })
        .put(finishLoading(authStore.logout))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail', () => {
    try {
      return expectSaga(authSaga.logoutSaga)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.logout))
        .provide([[call(authAPI.logout), throwError()]])
        .put({ type: authStore.logoutFail, payload: INNER_ERROR })
        .put(finishLoading(authStore.logout))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});

describe('GithubLoginSaga Saga', () => {
  const action = { payload: { code: 'code' } };
  it('should success', () => {
    try {
      return expectSaga(authSaga.githubLoginSaga, action as unknown as PayloadAction<IGithubCode>)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.getGithubLogin))
        .provide([[call(authAPI.githubLogin, action.payload), { data }]])
        .put({ type: authStore.getGithubLoginSuccess, payload: data })
        .put(finishLoading(authStore.getGithubLogin))
        .hasFinalState({
          ...authStore.initialState,
          user: { ...authStore.initialState.user, userId: data.userId, token: data.accessToken },
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail', () => {
    try {
      return expectSaga(authSaga.githubLoginSaga, action as unknown as PayloadAction<IGithubCode>)
        .withReducer(authStore.authReducer)
        .put(startLoading(authStore.getGithubLogin))
        .provide([[call(authAPI.githubLogin, action.payload), throwError()]])
        .put({ type: authStore.getGithubLoginFail, payload: INNER_ERROR })
        .put(finishLoading(authStore.getGithubLogin))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});
