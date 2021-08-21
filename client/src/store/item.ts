import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, call, takeLatest } from 'redux-saga/effects';
import * as itemAPI from 'utils/api/item';
import axios, { AxiosResponse } from 'axios';
import { IMainItem, IListItem, IItemState } from 'types/item';
import { ISearch, ISearchState, AutoCompleteKeyword } from 'types/search';
import { IError } from 'types/error';
import { finishLoading, startLoading } from './loading';

interface StateProps {
  main: IMainItem;
  list: IListItem;
  search: ISearch;
  error: string | null;
}

const initialState: StateProps = {
  main: {
    popularItems: [],
    newItems: [],
    recommendItems: [],
  },
  list: {
    items: [],
    totalCount: 0,
    pageCount: 0,
  },
  search: {
    autoComplete: null,
  },
  error: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    getMainItem: state => state,
    getMainItemSuccess: (state, action: PayloadAction<IMainItem>) => {
      state.main = action.payload;
      return state;
    },
    getMainItemFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
    getListItem: state => state,
    getListItemSuccess: (state, action: PayloadAction<IListItem>) => {
      state.list = action.payload;
      return state;
    },
    getListItemFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
    getAutoComplete: state => state,
    getAutoCompleteSuccess: (state, action: PayloadAction<AutoCompleteKeyword>) => {
      state.search.autoComplete = action.payload;
      return state;
    },
    getAutoCompleteFail: state => state,
  },
});

const { actions, reducer: itemReducer } = itemSlice;
const {
  getMainItem,
  getMainItemSuccess,
  getMainItemFail,
  getListItem,
  getListItemSuccess,
  getListItemFail,
  getAutoComplete,
  getAutoCompleteSuccess,
  getAutoCompleteFail,
} = actions;
export { itemReducer, getMainItem, getListItem, getAutoComplete };

function* getMainItemSaga(): Generator {
  try {
    yield put(startLoading(getMainItem));
    const { data } = (yield call(itemAPI.getMainItem)) as AxiosResponse<IMainItem>;
    yield put({ type: getMainItemSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getMainItemFail, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getMainItem));
  }
}

function* getListItemSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getListItem));
    const { data } = (yield call(
      itemAPI.getListItem,
      action.payload as unknown as IItemState,
    )) as AxiosResponse<IListItem>;
    yield put({ type: getListItemSuccess, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getListItemFail, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getListItem));
  }
}

function* autoCompleteSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getAutoComplete));
    const { data } = (yield call(
      itemAPI.getAutoComplete,
      action.payload as unknown as ISearchState,
    )) as AxiosResponse<AutoCompleteKeyword>;
    yield put({ type: getAutoCompleteSuccess, payload: data });
  } catch (e) {
    yield put({
      type: getAutoCompleteFail,
    });
  } finally {
    yield put(finishLoading(getAutoComplete));
  }
}

export function* itemSaga(): Generator {
  yield takeLatest(getMainItem, getMainItemSaga);
  yield takeLatest(getListItem, getListItemSaga);
  yield takeLatest(getAutoComplete, autoCompleteSaga);
}
