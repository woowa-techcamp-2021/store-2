// import { expectSaga, testSaga } from 'redux-saga-test-plan';
// import * as categoryStore from 'store/category';
// import * as categoryAPI from 'utils/api/category';
// import { retry } from 'redux-saga/effects';
// import * as categorySaga from '../category';
// // import { categorySaga as latestest } from 'store/category';
// // import MockAdapter from 'axios-mock-adapter';
// // import {catee} from 'store/category'

// // jest.mock('axios');

// // it('category', () => {
// //   const res = { category: [{ code: '000000', name: '전체' }] };
// //   // const category = [{ code: '000000', name: '전체' }];
// //   try {
// //     return expectSaga(categorySaga.getCategorySaga)
// //       .provide([[retry(10, 1000, categoryAPI.getCategories), res.category]])
// //       .put({ type: categoryStore.getCategoriesSuccess.type, payload: res.category })
// //       .run();
// //   } catch (e) {
// //     throw new Error(e);
// //   }
// // });
// it('works with unit tests', () => {
//   testSaga(categorySaga.getCategorySaga)
//     // advance saga with `next()`
//     .next()

//     // assert that the saga yields `take` with `'HELLO'` as type
//     // .take('HELLO')

//     // pass back in a value to a saga after it yields
//     // .next(action)

//     // assert that the saga yields `put` with the expected action
//     .put({ type: categoryStore.getCategoriesSuccess.type, payload: [{ code: '000000', name: '전체' }] })

//     .next()

//     // assert that the saga yields a `call` to `identity` with
//     // the `action` argument
//     // .call(identity, action)

//     // .next()

//     // assert that the saga is finished
//     .isDone();
// });
