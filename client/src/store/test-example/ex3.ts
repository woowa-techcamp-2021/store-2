import { call, delay, put, takeLatest } from 'redux-saga/effects';
import api from './api';

interface TaskAction extends IAction {
  type: 'FETCH_USER_REQUEST';
}

interface IAction {
  payload: number;
}

function* fetchUserSaga(action: IAction): Generator {
  try {
    const id: number = action.payload;
    const user = yield call(api.getUser, id);
    yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
  } catch (e) {
    throw new Error(e);
  }
}

function* watchFetchUserSaga(): Generator {
  yield takeLatest<TaskAction>('FETCH_USER_REQUEST', fetchUserSaga);
}

export default watchFetchUserSaga;
