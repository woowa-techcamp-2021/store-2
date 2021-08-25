import { PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';
import * as orderAPI from 'utils/api/order';
import axios, { AxiosResponse } from 'axios';
import { IError } from 'types/error';
import { IOrderList, IOrderState } from 'types/order';
import * as authStore from 'store/auth';
import * as orderStore from 'store/order';
import { finishLoading, startLoading } from 'store/loading';
import { IResetToken } from 'types/auth';

function* getOrdersSaga(action: PayloadAction<IOrderState>): Generator {
  try {
    yield put(startLoading(orderStore.getOrders));
    const token = localStorage.getItem('user') || '';
    let result = (yield call(orderAPI.getOrderList, action.payload, token)) as AxiosResponse<IOrderList | IResetToken>;
    if ('requestAgain' in result.data) {
      yield put({ type: authStore.getUserSuccess, payload: { newAccessToken: result.data.newAccessToken } });
      result = (yield call(orderAPI.getOrderList, action.payload, token)) as AxiosResponse<IOrderList>;
    }
    yield put({ type: orderStore.getOrdersSuccess, payload: result.data });
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
