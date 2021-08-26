import { PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';

import * as likeAPI from 'utils/api/like';

import * as likeStore from 'store/like';

function* addLikeSaga(action: PayloadAction<number>): Generator {
  try {
    yield call(likeAPI.addLike, action.payload);
    yield put({ type: likeStore.addLikeSuccess });
  } catch (e) {
    yield put({ type: likeStore.addLikeFail });
  }
}

function* deleteLikeSaga(action: PayloadAction<number>): Generator {
  try {
    yield call(likeAPI.deleteLike, action.payload);
    yield put({ type: likeStore.deleteLikeSuccess });
  } catch (e) {
    yield put({ type: likeStore.deleteLikeFail });
  }
}
export { addLikeSaga, deleteLikeSaga };
