import { expectSaga } from 'redux-saga-test-plan';
import fetchUsersSaga from './ex';

it('fetches users', () => {
  const users = ['Jeremy', 'Tucker'];

  const api = {
    getUsers: () => users,
  };

  return expectSaga(fetchUsersSaga, api).put({ type: 'FETCH_USERS_SUCCESS', payload: users }).run();
});
