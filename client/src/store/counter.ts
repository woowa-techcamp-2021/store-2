import { createAction, createSlice } from '@reduxjs/toolkit';
import { delay, put, takeLatest } from 'redux-saga/effects';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    hello: state => state + 10,
  },
});

export const { actions, reducer: counterReducer } = counterSlice;
export const { increment, decrement } = actions;

export const increaseAsync = createAction('INCREMENT_ASYNC');
export const decreaseAsync = createAction('DECREMENT_ASYNC');

function* increaseSaga() {
  try {
    yield delay(1000);
    yield put(increment());
  } catch (e) {
    throw new Error(e);
  }
}

function* decreaseSaga() {
  try {
    yield delay(1000);
    yield put(decrement());
  } catch (e) {
    throw new Error(e);
  }
}

function* helloSaga() {
  try {
    yield put(actions.hello());
  } catch (e) {
    throw new Error(e);
  }
}

export function* counterSaga(): Generator {
  yield takeLatest(increaseAsync, increaseSaga);
  yield takeLatest(decreaseAsync, decreaseSaga);
  yield takeLatest(actions.hello.toString(), helloSaga);
}
