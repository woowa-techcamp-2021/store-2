import { AxiosResponse } from 'axios';
import { retry, put } from 'redux-saga/effects';
import { ICategory } from 'types/category';
import * as categoryAPI from 'utils/api/category';
import * as categoryStore from 'store/category';
import { MAX_TRY_COUNT, DELAY_TIME } from 'constants/index';

function* getCategorySaga(): Generator {
  try {
    const { data } = (yield retry(MAX_TRY_COUNT, DELAY_TIME, categoryAPI.getCategories)) as AxiosResponse<ICategory[]>;
    yield put({
      type: categoryStore.getCategoriesSuccess.type,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: categoryStore.getCategoriesFail.type,
    });
  }
}

export { getCategorySaga };
