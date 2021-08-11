import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { counterReducer, counterSaga } from './counter';

const rootReducer = combineReducers({ counter: counterReducer });

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([counterSaga()]);
}

export default rootReducer;
