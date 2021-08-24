import { PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';
import * as orderAPI from 'utils/api/order';
import axios, { AxiosResponse } from 'axios';
import { IError } from 'types/error';
import { IOrderList, IOrderState } from 'types/order';
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

export { getOrdersSaga };
