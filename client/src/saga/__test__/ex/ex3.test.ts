import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import api from './api';
import watchFetchUserSaga from './ex3';

it('fetches a user', () => {
  const id = 42;
  const user = { id, name: 'Jeremy' };
  try {
    return expectSaga(watchFetchUserSaga)
      .provide([[call(api.getUser, id), user]])
      .put({ type: 'FETCH_USER_SUCCESS', payload: user })
      .dispatch({ type: 'FETCH_USER_REQUEST', payload: id })
      .silentRun();
  } catch (e) {
    throw new Error(e);
  }
});

/*
사가를 실행시키는 방법에는 run과 silentRun 2가지의 메서드가 있습니다.
일반적으로 사가 테스트에서는 run을 사용해서 경고메시지를 확인하는 것이 맞지만 takeLatest를 사용하는 경우에는 silentRun를 사용합니다.
그 이유는..!👆
takeLatest는 무한 루프를 돌기때문에 redux-saga-test-plan에서 경고 메시지와 함께 사가를 타임아웃 시키는데, 이때 slientRun를 사용하면 경고 메시지를 생략할 수 있습니다.
*/
