import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import * as orderAPI from 'utils/api/order';
import { INNER_ERROR } from 'constants/index';

import { finishLoading, startLoading } from 'store/loading';
import * as orderStore from 'store/order';
import * as orderSaga from '../order';

describe('getOrders Saga', () => {
  const order = {
    createdAt: '',
    thumbnail: 'thumbnail',
    title: 'title',
    status: '',
    price: 1000,
    count: 2,
  };

  const data = {
    orders: [order],
    pageCount: 0,
    totalCount: 0,
  };

  const action = {
    payload: { pageId: 1, prevDate: '20210901', currentDate: '20210901' },
    type: '',
  };

  it('should success', () => {
    try {
      return expectSaga(orderSaga.getOrdersSaga, action as unknown as PayloadAction)
        .withReducer(orderStore.orderReducer)
        .put(startLoading(orderStore.getOrders))
        .provide([[call(orderAPI.getOrderList, action.payload), { data }]])
        .put({ type: orderStore.getOrdersSuccess, payload: data })
        .put(finishLoading(orderStore.getOrders))
        .hasFinalState({
          ...orderStore.initialState,
          list: data,
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail because of error', () => {
    try {
      return expectSaga(orderSaga.getOrdersSaga, action as unknown as PayloadAction)
        .withReducer(orderStore.orderReducer)
        .put(startLoading(orderStore.getOrders))
        .provide([[call(orderAPI.getOrderList, action.payload), throwError()]])
        .put({ type: orderStore.getOrdersFail, payload: INNER_ERROR })
        .put(finishLoading(orderStore.getOrders))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});
