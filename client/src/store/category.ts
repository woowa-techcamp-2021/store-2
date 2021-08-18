import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { retry, put, takeLatest } from 'redux-saga/effects';
import * as categoryAPI from 'utils/api/category';
import { ICategory } from 'types/category';

const MAX_TRY_COUNT = 10;
const DELAY_TIME = 1000;

interface StateProps {
  categories: {
    data: ICategory[];
  };
}

const initialState: StateProps = {
  categories: {
    data: [],
  },
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories: state => state,
    getCategoriesSuccess: (state, action: PayloadAction<ICategory[]>) => {
      state.categories.data = action.payload;
      return state;
    },
    getCategoriesFail: state => {
      state.categories.data = [];
      return state;
    },
  },
});

const { actions, reducer: categoryReducer } = categorySlice;
const { getCategories, getCategoriesSuccess, getCategoriesFail } = actions;
export { categoryReducer, getCategories };

function* getCategorySaga(): Generator {
  try {
    const { data } = (yield retry(MAX_TRY_COUNT, DELAY_TIME, categoryAPI.getCategories)) as AxiosResponse<ICategory[]>;
    yield put({
      type: getCategoriesSuccess.type,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: getCategoriesFail.type,
    });
  }
}

export function* categorySaga(): Generator {
  yield takeLatest(getCategories, getCategorySaga);
}
