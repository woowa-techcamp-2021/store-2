import { PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import * as orderAPI from 'utils/api/order';
import { INNER_ERROR } from 'constants/index';

import { IError } from 'types/error';
import { IOrderList, IOrderState } from 'types/order';
import * as orderStore from 'store/order';
import { finishLoading, startLoading } from 'store/loading';

function* getOrdersSaga(action: PayloadAction<IOrderState>): Generator {
  try {
    yield put(startLoading(orderStore.getOrders));
    const { data } = (yield call(orderAPI.getOrderList, action.payload)) as AxiosResponse<IOrderList>;
    yield put({ type: orderStore.getOrdersSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: orderStore.getOrdersFail, payload: errorMessage });
    } else {
      yield put({ type: orderStore.getOrdersFail, payload: INNER_ERROR });
    }
  } finally {
    yield put(finishLoading(orderStore.getOrders));
  }
}

export { getOrdersSaga };
