import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from './auth';
import { counterReducer, counterSaga } from './counter';

const rootReducer = combineReducers({ counter: counterReducer, auth: authReducer });

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  try {
    yield all([counterSaga(), authSaga()]);
  } catch (e) {
    throw new Error(e);
  }
}

export default rootReducer;
