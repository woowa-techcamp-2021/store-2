import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { retry } from 'redux-saga/effects';

import { MAX_TRY_COUNT, DELAY_TIME } from 'constants/index';
import * as categoryAPI from 'utils/api/category';

import * as categoryStore from 'store/category';
import * as categorySaga from '../category';

describe('Category Saga', () => {
  it('category success', () => {
    const category = [{ code: '000000', name: '전체' }];
    try {
      return expectSaga(categorySaga.getCategorySaga)
        .provide([[retry(MAX_TRY_COUNT, DELAY_TIME, categoryAPI.getCategories), { data: category }]])
        .put({ type: categoryStore.getCategoriesSuccess, payload: category })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });

  it('should fail', () => {
    try {
      return expectSaga(categorySaga.getCategorySaga)
        .provide([[retry(MAX_TRY_COUNT, DELAY_TIME, categoryAPI.getCategories), throwError()]])
        .put({ type: categoryStore.getCategoriesFail })
        .run();
    } catch (e) {
      throw new Error(e);
    }
  });
});
