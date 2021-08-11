import { combineReducers } from 'redux';
import counterReducer, { counterSaga } from './counter';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ counter: counterReducer });

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([counterSaga()]);
}

export default rootReducer;
