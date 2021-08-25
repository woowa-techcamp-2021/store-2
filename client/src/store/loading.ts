import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    'auth/getLogin': false,
    'auth/getUser': false,
    'auth/getSignup': false,
    'item/getMainItem': false,
    'item/getListItem': false,
    'order/getListOrder': false,
    'order/getOrderItems': false,
    'order/postOrder': false,
  },
  reducers: {
    startLoading: (state, action) => ({ ...state, [action.payload]: true }),
    finishLoading: (state, action) => ({ ...state, [action.payload]: false }),
  },
});

const { actions, reducer: loadingReducer } = loadingSlice;
const { startLoading, finishLoading } = actions;
export { loadingReducer, startLoading, finishLoading };
