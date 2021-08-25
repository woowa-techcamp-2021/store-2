import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import * as itemAPI from 'utils/api/item';
import { INNER_ERROR } from 'constants/index';

import { finishLoading, startLoading } from 'store/loading';
import * as itemStore from 'store/item';
import * as itemSaga from '../item';

const item = {
  id: 1,
  thumbnail: 'thu',
  title: 'fake',
  price: '2400',
  isBest: true,
  isGreen: true,
  isNew: true,
  salePercent: '10',
  originalPrice: '1000',
};

describe('GetMainItem Saga', () => {
  it('should success', () => {
    const data = {
      popularItems: [item],
      newItems: [item],
      recommendItems: [item],
    };
    try {
      return expectSaga(itemSaga.getMainItemSaga)
        .withReducer(itemStore.itemReducer)
        .put(startLoading(itemStore.getMainItem))
        .provide([[call(itemAPI.getMainItem), { data }]])
        .put({ type: itemStore.getMainItemSuccess, payload: data })
        .put(finishLoading(itemStore.getMainItem))
        .hasFinalState({
          ...itemStore.initialState,
          main: data,
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail because of error', () => {
    try {
      return expectSaga(itemSaga.getMainItemSaga)
        .withReducer(itemStore.itemReducer)
        .put(startLoading(itemStore.getMainItem))
        .provide([[call(itemAPI.getMainItem), throwError()]])
        .put({ type: itemStore.getMainItemFail, payload: INNER_ERROR })
        .put(finishLoading(itemStore.getMainItem))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});

describe('GetListItem Saga', () => {
  const data = {
    items: [item],
    totalCount: 1,
    pageCount: 1,
  };
  const action = {
    payload: { categoryId: '000800', pageId: 1, type: '123', search: '123' },
  };
  it('should success', () => {
    try {
      return expectSaga(itemSaga.getListItemSaga, action as unknown as PayloadAction)
        .withReducer(itemStore.itemReducer)
        .put(startLoading(itemStore.getListItem))
        .provide([[call(itemAPI.getListItem, action.payload), { data }]])
        .put({ type: itemStore.getListItemSuccess, payload: data })
        .put(finishLoading(itemStore.getListItem))
        .hasFinalState({
          ...itemStore.initialState,
          list: data,
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail because of error', () => {
    try {
      return expectSaga(itemSaga.getListItemSaga, action as unknown as PayloadAction)
        .withReducer(itemStore.itemReducer)
        .put(startLoading(itemStore.getListItem))
        .provide([[call(itemAPI.getListItem, action.payload), throwError()]])
        .put({ type: itemStore.getListItemFail, payload: INNER_ERROR })
        .put(finishLoading(itemStore.getListItem))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});

describe('AutoCompleteSaga', () => {
  const data = ['매거진'];

  const action = {
    payload: { keyword: 'keyword' },
  };
  it('should success', () => {
    try {
      return expectSaga(itemSaga.autoCompleteSaga, action as unknown as PayloadAction)
        .withReducer(itemStore.itemReducer)
        .put(startLoading(itemStore.getAutoComplete))
        .provide([[call(itemAPI.getAutoComplete, action.payload), { data }]])
        .put({ type: itemStore.getAutoCompleteSuccess, payload: data })
        .put(finishLoading(itemStore.getAutoComplete))
        .hasFinalState({
          ...itemStore.initialState,
          search: { autoComplete: data },
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail because of error', () => {
    try {
      return expectSaga(itemSaga.autoCompleteSaga, action as unknown as PayloadAction)
        .withReducer(itemStore.itemReducer)
        .put(startLoading(itemStore.getAutoComplete))
        .provide([[call(itemAPI.getAutoComplete, action.payload), throwError()]])
        .put({ type: itemStore.getAutoCompleteFail })
        .put(finishLoading(itemStore.getAutoComplete))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});

describe('GetItemSaga', () => {
  const data = {
    thumbnail: '',
    title: '',
    price: 0,
    salePercent: 0,
    contents: [],
    isSoldOut: false,
    isLike: false,
    reviewCount: 0,
  };
  const action = {
    payload: { id: '1' },
  };
  it('should success', () => {
    try {
      return expectSaga(itemSaga.getItemSaga, action as unknown as PayloadAction)
        .withReducer(itemStore.itemReducer)
        .put(startLoading(itemStore.getItem))
        .provide([[call(itemAPI.getItem, action.payload), { data }]])
        .put({ type: itemStore.getItemSuccess, payload: data })
        .put(finishLoading(itemStore.getItem))
        .hasFinalState({
          ...itemStore.initialState,
          item: data,
        })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail because of error', () => {
    try {
      return expectSaga(itemSaga.getItemSaga, action as unknown as PayloadAction)
        .withReducer(itemStore.itemReducer)
        .put(startLoading(itemStore.getItem))
        .provide([[call(itemAPI.getItem, action.payload), throwError()]])
        .put({ type: itemStore.getItemFail, payload: INNER_ERROR })
        .put(finishLoading(itemStore.getItem))
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});
