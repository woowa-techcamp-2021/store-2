import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from './auth';
import { itemReducer, itemSaga } from './item';
import { loadingReducer } from './loading';
import { categoryReducer, categorySaga } from './category';
import { orderReducer, orderSaga } from './order';
import { addressReducer, addressSaga } from './address';
import { likeReducer, likeSaga } from './like';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  item: itemReducer,
  category: categoryReducer,
  order: orderReducer,
  address: addressReducer,
  like: likeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  try {
    yield all([authSaga(), itemSaga(), categorySaga(), orderSaga(), addressSaga(), likeSaga()]);
  } catch (e) {
    throw new Error(e);
  }
}

export default rootReducer;
