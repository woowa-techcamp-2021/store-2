import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from './auth';
import { itemReducer, itemSaga } from './item';
import { loadingReducer } from './loading';
import { categoryReducer, categorySaga } from './category';
import { orderReducer, orderSaga } from './order';
import { addressReducer, addressSaga } from './address';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  item: itemReducer,
  category: categoryReducer,
  order: orderReducer,
  address: addressReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  try {
    yield all([authSaga(), itemSaga(), categorySaga(), orderSaga(), addressSaga()]);
  } catch (e) {
    throw new Error(e);
  }
}

export default rootReducer;
