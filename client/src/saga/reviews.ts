import { PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import * as reviewAPI from 'utils/api/review';

import { INNER_ERROR } from 'constants/index';

import { IListReview, IReviewData, IReviewState } from 'types/review';
import { IError } from 'types/error';
import * as reviewStore from 'store/review';
import { finishLoading, startLoading } from 'store/loading';

function* getReviewsSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(reviewStore.getReviews));
    const { data } = (yield call(
      reviewAPI.getReviewList,
      action.payload as unknown as IReviewState,
    )) as AxiosResponse<IListReview>;
    yield put({ type: reviewStore.getReviewsSuccess, payload: data });
  } catch (e) {
    yield put({
      type: reviewStore.getReviewsFail,
    });
  } finally {
    yield put(finishLoading(reviewStore.getReviews));
  }
}

function* postReviewSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(reviewStore.postReview));
    const { data } = (yield call(
      reviewAPI.postReview,
      action.payload as unknown as IReviewData,
    )) as AxiosResponse<IListReview>;
    yield put({ type: reviewStore.postReviewSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: reviewStore.postReviewsFail, payload: errorMessage });
    } else {
      yield put({ type: reviewStore.postReviewsFail, payload: INNER_ERROR });
    }
  } finally {
    yield put(finishLoading(reviewStore.postReview));
  }
}

export { getReviewsSaga, postReviewSaga };
