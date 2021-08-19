import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { startLoading, finishLoading } from 'store/loading';

import * as itemAPI from 'utils/api/item';

export interface ISearch {
  autoComplete: AutoCompleteKeyword | null;
}

export interface ISearchState {
  keyword: string;
}

export type AutoCompleteKeyword = string[];

interface StateProps {
  search: ISearch;
}

const initialState: StateProps = {
  search: {
    autoComplete: null,
  },
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    getAutoComplete: state => state,
    getAutoCompleteSuccess: (state, action: PayloadAction<AutoCompleteKeyword>) => {
      state.search.autoComplete = action.payload;
      return state;
    },
    getAutoCompleteFail: state => state,
  },
});

const { actions, reducer: itemReducer } = itemSlice;
const { getAutoComplete, getAutoCompleteSuccess, getAutoCompleteFail } = actions;
export { itemReducer, getAutoComplete };

function* autoCompleteSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getAutoComplete.type));
    const { data } = (yield call(
      itemAPI.getAutoComplete,
      action.payload as unknown as ISearchState,
    )) as AxiosResponse<AutoCompleteKeyword>;
    yield put({ type: getAutoCompleteSuccess.type, payload: data });
  } catch (e) {
    yield put({
      type: getAutoCompleteFail.type,
    });
  } finally {
    yield put(finishLoading(getAutoComplete.type));
  }
}

export function* itemSaga(): Generator {
  yield takeLatest(getAutoComplete, autoCompleteSaga);
}
