// // import * as axios from 'axios';
// import { expectSaga } from 'redux-saga-test-plan';
// import * as authStore from 'store/auth';
// import * as authAPI from 'utils/api/auth';
// import { call } from 'redux-saga-test-plan/matchers';
// import { PayloadAction } from '@reduxjs/toolkit';
// // import MockAdapter from 'axios-mock-adapter';
// import { finishLoading, startLoading } from 'store/loading';
// import * as authSaga from '../auth';

// jest.mock('axios');
// // const mockedAxios = axios as jest.Mocked<typeof axios>;
// // mockedAxios.get.mockResolvedValue({ data: {data} });

// it('login', () => {
//   const data = { accessToken: 'a', userId: 'b' };
//   const action = {
//     payload: { id: 'guest', password: 'guest' },
//   };
//   try {
//     return expectSaga(authSaga.loginSaga, action as unknown as PayloadAction)
//       .put(startLoading(authStore.getLogin.type))
//       .provide([[call(authAPI.login, action as unknown as authSaga.IAuthState), data]])
//       .put({ type: authStore.getLoginSuccess.type })
//       .put({ type: authStore.getUserSuccess.type, payload: data.userId })
//       .put(finishLoading(authStore.getLogin.type))
//       .run();
//     // .slientRun();
//   } catch (e) {
//     throw new Error(e);
//   }
// });
