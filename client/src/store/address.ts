import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { addAddressSaga, getAddressSaga, removeAddressSaga } from 'saga/address';
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
    getListAddress: state => state,
    getListAddressSuccess: (state, action: PayloadAction<IListAddress[]>) => {
      state.list = action.payload;
      state.error = null;
      return state;
    },
    getListAddressFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
    addAddress: state => state,
    addAddressSuccess: (state, action: PayloadAction<IListAddress[]>) => {
      state.list = action.payload;
      state.error = null;
      return state;
    },
    addAddressFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
    removeAddress: state => state,
    removeAddressSuccess: (state, action: PayloadAction<IListAddress[]>) => {
      state.list = action.payload;
      state.error = null;
      return state;
    },
    removeAddressFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
  },
});

const { actions, reducer: addressReducer } = addressSlice;
export const {
  getListAddress,
  getListAddressSuccess,
  getListAddressFail,
  addAddress,
  addAddressSuccess,
  addAddressFail,
  removeAddress,
  removeAddressSuccess,
  removeAddressFail,
} = actions;
export { addressReducer, initialState };

export function* addressSaga(): Generator {
  yield takeLatest(getListAddress, getAddressSaga);
  yield takeLatest(addAddress, addAddressSaga);
  yield takeLatest(removeAddress, removeAddressSaga);
}
