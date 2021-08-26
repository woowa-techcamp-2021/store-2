import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { ICategory } from 'types/category';
import { getCategorySaga } from 'saga/category';

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
export const { getCategories, getCategoriesSuccess, getCategoriesFail } = actions;
export { categoryReducer };

export function* categorySaga(): Generator {
  yield takeLatest(getCategories.type, getCategorySaga);
}
