import { call, put } from 'redux-saga/effects';
import api from './api';

function* fetchUsersSaga(): Generator {
  try {
    const users = yield call(api.getUsers);
    yield put({ type: 'FETCH_USERS_SUCCESS', payload: users });
  } catch (e) {
    throw new Error(e);
  }
}

export default fetchUsersSaga;
