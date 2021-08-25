import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { IMainItem, IListItem, IItemDetail } from 'types/item';
import { ISearch, AutoCompleteKeyword } from 'types/search';
import {
  autoCompleteSaga,
  getItemSaga,
  getListItemSaga,
  getMainItemSaga,
  addLikeSaga,
  deleteLikeSaga,
} from 'saga/item';

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
    addLike: state => state,
    addLikeSuccess: state => {
      state.item.isLike = true;
      return state;
    },
    addLikeFail: state => {
      state.item.isLike = false;
      return state;
    },
    deleteLike: state => state,
    deleteLikeSuccess: state => {
      state.item.isLike = false;
      return state;
    },
    deleteLikeFail: state => {
      state.item.isLike = true;
      return state;
    },
  },
});

const { actions, reducer: itemReducer } = itemSlice;
export const {
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
  addLike,
  addLikeSuccess,
  addLikeFail,
  deleteLike,
  deleteLikeSuccess,
  deleteLikeFail,
} = actions;
export { itemReducer, initialState };

export function* itemSaga(): Generator {
  yield takeLatest(getMainItem.type, getMainItemSaga);
  yield takeLatest(getListItem.type, getListItemSaga);
  yield takeLatest(getAutoComplete.type, autoCompleteSaga);
  yield takeLatest(getItem.type, getItemSaga);
  yield takeLatest(addLike.type, addLikeSaga);
  yield takeLatest(deleteLike.type, deleteLikeSaga);
}
