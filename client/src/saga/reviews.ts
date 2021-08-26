import { PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as reviewAPI from 'utils/api/review';

import { IListReview, IReviewState, IRieviewPost } from 'types/review';
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
    yield put(startLoading(reviewStore.getReviews));
    const { data } = (yield call(
      reviewAPI.postReview,
      action.payload as unknown as IRieviewPost,
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

export { getReviewsSaga, postReviewSaga };
