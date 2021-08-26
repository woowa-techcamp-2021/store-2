import { createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { addLikeSaga, deleteLikeSaga } from 'saga/like';

const initialState = {};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLike: state => state,
    addLikeSuccess: state => state,
    addLikeFail: state => state,
    deleteLike: state => state,
    deleteLikeSuccess: state => state,
    deleteLikeFail: state => state,
  },
});

const { actions, reducer: likeReducer } = likeSlice;
export const { addLike, addLikeSuccess, addLikeFail, deleteLike, deleteLikeSuccess, deleteLikeFail } = actions;
export { likeReducer, initialState };

export function* likeSaga(): Generator {
  yield takeLatest(addLike.type, addLikeSaga);
  yield takeLatest(deleteLike.type, deleteLikeSaga);
}
