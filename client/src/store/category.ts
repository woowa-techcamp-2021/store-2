import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as categoryAPI from 'utils/api/category';
import { ICategory } from 'types/category';

interface StateProps {
  categories: {
    data: ICategory[];
    error: null | string;
  };
}

interface IError {
  errorMessage: string;
}

const initialState: StateProps = {
  categories: {
    data: [],
    error: null,
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
    getCategoriesFail: (state, action: PayloadAction<string>) => {
      state.categories.error = action.payload;
      return state;
    },
  },
});

const { actions, reducer: categoryReducer } = categorySlice;
const { getCategories, getCategoriesSuccess, getCategoriesFail } = actions;
export { categoryReducer, getCategories };

function* getCategorySaga(): Generator {
  try {
    const { data } = (yield call(categoryAPI.getCategories)) as AxiosResponse<ICategory[]>;
    yield put({
      type: getCategoriesSuccess.type,
      payload: data,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({
        type: getCategoriesFail.type,
        payload: errorMessage,
      });
    } else {
      throw new Error(e);
    }
  }
}

export function* categorySaga(): Generator {
  yield takeLatest(getCategories, getCategorySaga);
}
