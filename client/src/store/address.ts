import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { getAddressSaga } from 'saga/address';
import { IListAddress } from 'types/address';

interface StateProps {
  list: IListAddress[];
  error: string | null;
}

const initialState: StateProps = {
  list: [],
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    getListAddress: state => {
      state.error = null;
      return state;
    },
    getListAddressSuccess: (state, action: PayloadAction<IListAddress[]>) => {
      state.list = action.payload;
      return state;
    },
    getListAddressFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
  },
});

const { actions, reducer: addressReducer } = addressSlice;
export const { getListAddress, getListAddressSuccess, getListAddressFail } = actions;
export { addressReducer, initialState };

export function* addressSaga(): Generator {
  yield takeLatest(getListAddress, getAddressSaga);
}
