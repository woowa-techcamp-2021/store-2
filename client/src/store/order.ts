import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

import { IOrderList, IOrderItem } from 'types/order';
import { postOrderSaga, getOrderItemsSaga, getOrdersSaga } from 'saga/order';

interface StateProps {
  list: IOrderList;
  orderItems: IOrderItem[];
  error: null | string;
  postError: null | string;
}

export const initialState: StateProps = {
  list: {
    orders: [],
    pageCount: 0,
    totalCount: 0,
  },
  orderItems: [],
  error: null,
  postError: null,
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
    getOrderItems: state => state,
    getOrderItemsSuccess: (state, action: PayloadAction<IOrderItem[]>) => {
      state.orderItems = action.payload;
      return state;
    },
    getOrderItemsFail: state => state,
    postOrder: state => state,
    postOrderSuccess: state => state,
    postOrderFail: (state, action: PayloadAction<string>) => {
      state.postError = action.payload;
      return state;
    },
  },
});

const { actions, reducer: orderReducer } = orderSlice;

export const {
  getOrders,
  getOrdersSuccess,
  getOrdersFail,
  postOrder,
  postOrderSuccess,
  postOrderFail,
  getOrderItems,
  getOrderItemsSuccess,
  getOrderItemsFail,
} = actions;
export { orderReducer };

export function* orderSaga(): Generator {
  yield takeLatest(getOrders, getOrdersSaga);
  yield takeLatest(postOrder, postOrderSaga);
  yield takeLatest(getOrderItems, getOrderItemsSaga);
}
