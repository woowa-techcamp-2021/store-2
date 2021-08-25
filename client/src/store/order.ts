import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, call, takeLatest } from 'redux-saga/effects';
import * as orderAPI from 'utils/api/order';
import axios, { AxiosResponse } from 'axios';
import { IError } from 'types/error';
import { IOrderList, IOrderState, IOrderItem } from 'types/order';
import { postOrderSaga, getOrderItemsSaga } from 'saga/order';
import { finishLoading, startLoading } from './loading';

interface StateProps {
  list: IOrderList;
  orderItems: IOrderItem[];
  error: null | string;
  postError: null | string;
}

const initialState: StateProps = {
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

function* getOrdersSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getOrders));
    const { data } = (yield call(
      orderAPI.getOrderList,
      action.payload as unknown as IOrderState,
    )) as AxiosResponse<IOrderList>;
    yield put({ type: getOrdersSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getOrdersFail, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getOrders));
  }
}

export function* orderSaga(): Generator {
  yield takeLatest(getOrders, getOrdersSaga);
  yield takeLatest(postOrder, postOrderSaga);
  yield takeLatest(getOrderItems, getOrderItemsSaga);
}
