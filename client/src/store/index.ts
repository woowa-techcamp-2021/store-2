import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from './auth';
import { loadingReducer } from './loading';
import { itemReducer, itemSaga } from './item';

const rootReducer = combineReducers({ auth: authReducer, loading: loadingReducer, item: itemReducer });

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  try {
    yield all([authSaga(), itemSaga()]);
  } catch (e) {
    throw new Error(e);
  }
}

export default rootReducer;
