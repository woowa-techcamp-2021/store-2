import { PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';
import * as orderAPI from 'utils/api/order';
import * as itemAPI from 'utils/api/item';
import axios, { AxiosResponse } from 'axios';
import { IError } from 'types/error';
import { IOrderList, IOrderState, IPostOrder, IOrderItem } from 'types/order';
import * as orderStore from 'store/order';
import { finishLoading, startLoading } from 'store/loading';

function* getOrdersSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(orderStore.getOrders));
    const { data } = (yield call(
      orderAPI.getOrderList,
      action.payload as unknown as IOrderState,
    )) as AxiosResponse<IOrderList>;
    yield put({ type: orderStore.getOrdersSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: orderStore.getOrdersFail, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(orderStore.getOrders));
  }
}

function* postOrderSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(orderStore.postOrder));
    yield call(orderAPI.postOrder, action.payload as unknown as IPostOrder);
    yield put({ type: orderStore.postOrderSuccess });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const { errorMessage } = err.response?.data as IError;
      yield put({ type: orderStore.getOrdersFail, payload: errorMessage });
    } else {
      yield put({ type: orderStore.getOrdersFail, payload: '알 수 없는 에러가 발생했습니다.' });
    }
  } finally {
    yield put(finishLoading(orderStore.getOrders));
  }
}

function* getOrderItemsSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(orderStore.getOrderItems));
    const { data } = (yield call(itemAPI.getOrderItems, action.payload as unknown as string)) as AxiosResponse<
      IOrderItem[]
    >;
    yield put({ type: orderStore.getOrderItemsSuccess, payload: data });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const { errorMessage } = err.response?.data as IError;
      yield put({ type: orderStore.getOrderItemsFail, payload: errorMessage });
    } else {
      yield put({ type: orderStore.getOrderItemsFail, payload: '알 수 없는 에러가 발생했습니다.' });
    }
  } finally {
    yield put(finishLoading(orderStore.getOrderItems));
  }
}

export { getOrdersSaga, postOrderSaga, getOrderItemsSaga };
