import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

function* userSaga() {
  try {
    const action = yield take('REQUEST_USER');
    const user = yield call(api.fetchUser, action.payload);
    const pet = yield call(api.fetchPet, user.petId);

    yield put({
      type: 'RECEIVE_USER',
      payload: { user, pet },
    });
  } catch (e) {
    yield put({ type: 'FAIL_USER', error: e });
  }
}

it('fetches the user', () => {
  const fakeUser = { name: 'Jeremy', petId: 20 };
  const fakeDog = { name: 'Tucker' };

  return expectSaga(userSaga, api)
    .provide([
      [call(api.fetchUser, 42), fakeUser],
      [matchers.call.fn(api.fetchPet), fakeDog],
    ])
    .put({
      type: 'RECEIVE_USER',
      payload: { user: fakeUser, pet: fakeDog },
    })
    .dispatch({ type: 'REQUEST_USER', payload: 42 })
    .run();
});

it('handles errors', () => {
  const error = new Error('error');

  return expectSaga(userSaga, api)
    .provide([[matchers.call.fn(api.fetchUser), throwError(error)]])
    .put({ type: 'FAIL_USER', error })
    .dispatch({ type: 'REQUEST_USER', payload: 42 })
    .run();
});
