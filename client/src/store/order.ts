import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { take, takeLatest } from 'redux-saga/effects';
import { getOrdersSaga } from 'saga/order';
import { IOrderList } from 'types/order';

interface StateProps {
  list: IOrderList;
  error: null | string;
}

const initialState: StateProps = {
  list: {
    orders: [],
    pageCount: 0,
    totalCount: 0,
  },
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrders: state => state,
    getOrdersSuccess: (state, action: PayloadAction<IOrderList>) => {
      state.list = action.payload;
      return state;
    },
    getOrdersFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
  },
});

const { actions, reducer: orderReducer } = orderSlice;
export const { getOrders, getOrdersSuccess, getOrdersFail } = actions;
export { orderReducer };

export function* orderSaga(): Generator {
  yield takeLatest(getOrders.type, getOrdersSaga);
}
