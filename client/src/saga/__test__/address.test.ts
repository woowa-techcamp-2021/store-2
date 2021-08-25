import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';

import * as addressAPI from 'utils/api/address';
import { INNER_ERROR } from 'constants/index';

import { finishLoading, startLoading } from 'store/loading';
import * as addressStore from 'store/address';
import * as addressSaga from '../address';

describe('getAddress Saga', () => {
  const list = [{ id: 1, name: '집', receiver: '민상', address: '석수동' }];
  it('should success', () => {
    try {
      return expectSaga(addressSaga.getAddressSaga)
        .withReducer(addressStore.addressReducer)
        .put(startLoading(addressStore.getListAddress))
        .provide([[call(addressAPI.getAddress), { data: list }]])
        .put({ type: addressStore.getListAddressSuccess, payload: list })
        .put(finishLoading(addressStore.getListAddress))
        .hasFinalState({
          ...addressStore.initialState,
          list,
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail because of error', () => {
    try {
      return expectSaga(addressSaga.getAddressSaga)
        .withReducer(addressStore.addressReducer)
        .put(startLoading(addressStore.getListAddress))
        .provide([[call(addressAPI.getAddress), throwError()]])
        .put({ type: addressStore.getListAddressFail, payload: INNER_ERROR })
        .put(finishLoading(addressStore.getListAddress))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});
