import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from './auth';
import { itemsReducer, itemsSaga } from './items';
import { loadingReducer } from './loading';

const rootReducer = combineReducers({ auth: authReducer, loading: loadingReducer, items: itemsReducer });

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  try {
    yield all([authSaga(), itemsSaga()]);
  } catch (e) {
    throw new Error(e);
  }
}

export default rootReducer;
