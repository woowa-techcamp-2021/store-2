import { PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { IMainItem, IListItem, IItemState, IItemDetail } from 'types/item';
import { ISearchState, AutoCompleteKeyword } from 'types/search';
import { IError } from 'types/error';

import * as itemAPI from 'utils/api/item';
import * as likeAPI from 'utils/api/like';
import { INNER_ERROR } from 'constants/index';

import { finishLoading, startLoading } from 'store/loading';
import * as itemStore from 'store/item';

function* getMainItemSaga(): Generator {
  try {
    yield put(startLoading(itemStore.getMainItem));
    const { data } = (yield call(itemAPI.getMainItem)) as AxiosResponse<IMainItem>;
    yield put({ type: itemStore.getMainItemSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: itemStore.getMainItemFail, payload: errorMessage });
    } else yield put({ type: itemStore.getMainItemFail, payload: INNER_ERROR });
  } finally {
    yield put(finishLoading(itemStore.getMainItem));
  }
}

function* getListItemSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(itemStore.getListItem));
    const { data } = (yield call(
      itemAPI.getListItem,
      action.payload as unknown as IItemState,
    )) as AxiosResponse<IListItem>;
    yield put({ type: itemStore.getListItemSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: itemStore.getListItemFail, payload: errorMessage });
    } else yield put({ type: itemStore.getListItemFail, payload: INNER_ERROR });
  } finally {
    yield put(finishLoading(itemStore.getListItem));
  }
}

function* autoCompleteSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(itemStore.getAutoComplete));
    const { data } = (yield call(
      itemAPI.getAutoComplete,
      action.payload as unknown as ISearchState,
    )) as AxiosResponse<AutoCompleteKeyword>;
    yield put({ type: itemStore.getAutoCompleteSuccess, payload: data });
  } catch (e) {
    yield put({
      type: itemStore.getAutoCompleteFail,
    });
  } finally {
    yield put(finishLoading(itemStore.getAutoComplete));
  }
}

function* getItemSaga(action: PayloadAction<{ id: string }>): Generator {
  try {
    yield put(startLoading(itemStore.getItem));
    const { data } = (yield call(itemAPI.getItem, action.payload)) as AxiosResponse<IItemDetail>;
    yield put({ type: itemStore.getItemSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: itemStore.getItemFail, payload: errorMessage });
    } else {
      yield put({ type: itemStore.getItemFail, payload: INNER_ERROR });
    }
  } finally {
    yield put(finishLoading(itemStore.getItem));
  }
}

function* addLikeSaga(action: PayloadAction<number>): Generator {
  try {
    yield call(likeAPI.addLike, action.payload);
    yield put({ type: itemStore.addLikeSuccess });
  } catch (e) {
    yield put({ type: itemStore.addLikeFail });
  }
}

function* deleteLikeSaga(action: PayloadAction<number>): Generator {
  try {
    yield call(likeAPI.deleteLike, action.payload);
    yield put({ type: itemStore.deleteLikeSuccess });
  } catch (e) {
    yield put({ type: itemStore.deleteLikeFail });
  }
}

export { getMainItemSaga, getListItemSaga, autoCompleteSaga, getItemSaga, addLikeSaga, deleteLikeSaga };
