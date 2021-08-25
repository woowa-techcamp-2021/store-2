import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import * as addressAPI from 'utils/api/address';
import { INNER_ERROR } from 'constants/index';

import { IError } from 'types/error';
import { IListAddress } from 'types/address';
import { startLoading, finishLoading } from 'store/loading';
import * as addressStore from 'store/address';

function* getAddressSaga(): Generator {
  try {
    yield put(startLoading(addressStore.getListAddress));
    const { data } = (yield call(addressAPI.getAddress)) as AxiosResponse<IListAddress[]>;
    yield put({
      type: addressStore.getListAddressSuccess,
      payload: data,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: addressStore.getListAddressFail,
        payload: errorMessage,
      });
    } else {
      yield put({
        type: addressStore.getListAddressFail,
        payload: INNER_ERROR,
      });
    }
  } finally {
    yield put(finishLoading(addressStore.getListAddress));
  }
}

export { getAddressSaga };
