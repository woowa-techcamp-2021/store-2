import { call, put } from 'redux-saga/effects';
import api from './api';

function* fetchUsersSaga(): Generator {
  const users = yield call(api.getUsers) as unknown as string[];
  yield put({ type: 'FETCH_USERS_SUCCESS', payload: users });
}

export default fetchUsersSaga;
