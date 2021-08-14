import { call, put } from 'redux-saga/effects';

interface IApi {
  getUsers: () => string[];
}
function* fetchUsersSaga({ getUsers }: IApi): Generator {
  try {
    const users = yield call(getUsers);
    yield put({ type: 'FETCH_USERS_SUCCESS', payload: users });
  } catch (e) {
    throw new Error(e);
  }
}

export default fetchUsersSaga;
