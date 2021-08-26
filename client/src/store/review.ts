import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { getReviewsSaga, postReviewSaga } from 'saga/reviews';
import { IListReview } from 'types/review';

interface StateProps {
  list: IListReview;
  error: null | string;
}

export const initialState: StateProps = {
  list: {
    reviews: [],
    pageCount: 0,
    totalCount: 0,
  },
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    getReviews: state => state,
    getReviewsSuccess: (state, action: PayloadAction<IListReview>) => {
      state.list = action.payload;
      return state;
    },
    getReviewsFail: state => state,
    postReview: state => state,
    postReviewSuccess: (state, action: PayloadAction<IListReview>) => {
      state.list = action.payload;
      return state;
    },
    postReviewsFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
  },
});

const { actions, reducer: reviewReducer } = reviewSlice;

export const { getReviews, getReviewsSuccess, getReviewsFail, postReview, postReviewSuccess, postReviewsFail } =
  actions;
export { reviewReducer };

export function* reviewSaga(): Generator {
  yield takeLatest(getReviews, getReviewsSaga);
  yield takeLatest(postReview, postReviewSaga);
}
