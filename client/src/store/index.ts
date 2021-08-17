import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from './auth';
import { loadingReducer } from './loading';

const rootReducer = combineReducers({ auth: authReducer, loading: loadingReducer });

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  try {
    yield all([authSaga()]);
  } catch (e) {
    throw new Error(e);
  }
}

export default rootReducer;
