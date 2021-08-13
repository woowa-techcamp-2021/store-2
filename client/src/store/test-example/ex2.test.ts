import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import api from './api';
import fetchUsersSaga from './ex2';

it('fetches users', () => {
  const users = ['Jeremy', 'Tucker'];

  return expectSaga(fetchUsersSaga)
    .provide([[call(api.getUsers), users]])
    .put({ type: 'FETCH_USERS_SUCCESS', payload: users })
    .run();
});
