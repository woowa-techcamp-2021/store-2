import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, call, takeLatest } from 'redux-saga/effects';
import * as itemAPI from 'utils/api/item';
import axios, { AxiosResponse } from 'axios';
import { IMainItem, IListItem, IItemState, IItemDetail } from 'types/item';
import { ISearch, ISearchState, AutoCompleteKeyword } from 'types/search';
import { IError } from 'types/error';
import { finishLoading, startLoading } from './loading';

interface StateProps {
  main: IMainItem;
  list: IListItem;
  item: IItemDetail;
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
  item: {
    thumbnail: '',
    title: '',
    price: 0,
    salePercent: 0,
    contents: [],
    isSoldOut: false,
    isLike: false,
    reviewCount: 0,
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
    getListItem: state => {
      state.list.totalCount = 0;
      state.list.pageCount = 0;
      return state;
    },
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
    getItem: state => state,
    getItemSuccess: (state, action: PayloadAction<string>) => {
      state.item = action.payload as unknown as IItemDetail;
    },
    getItemFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
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
  getItem,
  getItemSuccess,
  getItemFail,
} = actions;
export { itemReducer, getMainItem, getListItem, getAutoComplete, getItem };

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

function* getItemSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getItem.type));
    const { data } = (yield call(
      itemAPI.getItem,
      action.payload as unknown as { id: string },
    )) as AxiosResponse<IItemDetail>;
    yield put({ type: getItemSuccess.type, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getItemFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getItem.type));
  }
}

export function* itemSaga(): Generator {
  yield takeLatest(getMainItem, getMainItemSaga);
  yield takeLatest(getListItem, getListItemSaga);
  yield takeLatest(getAutoComplete, autoCompleteSaga);
  yield takeLatest(getItem, getItemSaga);
}
