import { call, delay, put, takeLatest } from 'redux-saga/effects';
import api from './api';

interface TaskAction extends IAction {
  type: 'FETCH_USER_REQUEST';
}

interface IAction {
  payload: number;
}

interface IApi {
  getUsers: () => string[];
}

function* fetchUserSaga(action: IAction) {
  const id: number = action.payload;
  // eslint-disable-next-line
  const user: string = yield call(api.getUser, id);
  yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
}

function* watchFetchUserSaga(): Generator {
  // eslint-disable-next-line
  yield takeLatest<TaskAction>('FETCH_USER_REQUEST', fetchUserSaga);
}

export default watchFetchUserSaga;
