import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    'auth/getLogin': false,
    'auth/getUser': false,
    'auth/getSignup': false,
    'auth/getMainItem': false,
  },
  reducers: {
    startLoading: (state, action) => ({ ...state, [action.payload]: true }),
    finishLoading: (state, action) => ({ ...state, [action.payload]: false }),
  },
});

const { actions, reducer: loadingReducer } = loadingSlice;
const { startLoading, finishLoading } = actions;
export { loadingReducer, startLoading, finishLoading };
