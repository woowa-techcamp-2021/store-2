import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'store/loading';

type IData = unknown;
interface IError {
  errorMessage: string;
}

const createPromiseSaga = (type: string, promiseCreator: (data: unknown) => Promise<AxiosResponse>): unknown => {
  const SUCCESS = `${type}Success`;
  const FAIL = `${type}Success`;
  return function* saga(action: PayloadAction) {
    try {
      yield put(startLoading(type));
      const { data } = (yield call(promiseCreator, action.payload)) as AxiosResponse<IData>;
      yield put({ type: SUCCESS, payload: data });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { errorMessage } = e.response?.data as IError;
        yield put({ type: FAIL, payload: errorMessage });
      } else {
        throw new Error(e);
      }
    } finally {
      yield put(finishLoading(type));
    }
  };
};
export default createPromiseSaga;
