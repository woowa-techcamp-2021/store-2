import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import * as itemsAPI from 'utils/api/items';
import { IItem } from 'types/item';
import createPromiseSaga from 'utils/saga-utils';

interface MainProps {
  popularItems: IItem[] | null;
  newItems: IItem[] | null;
  recommendItems: IItem[] | null;
}

interface StateProps {
  mainItems: {
    popularItems: IItem[] | null;
    newItems: IItem[] | null;
    recommendItems: IItem[] | null;
  };
  items: IItem[] | null;
  error: null | string;
}

const initialState: StateProps = {
  mainItems: {
    popularItems: null,
    newItems: null,
    recommendItems: null,
  },
  items: null,
  error: null,
};

const counterSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    getMainItems: state => state,
    getMainItemsSuccess: (state, action: PayloadAction<string>) => {
      state.mainItems = action.payload as unknown as MainProps;
    },
    getMainItemsFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
  },
});

const { actions, reducer: itemsReducer } = counterSlice;
const { getMainItems } = actions;
export { getMainItems, itemsReducer };
const getMainItemsSaga = createPromiseSaga(getMainItems.type, itemsAPI.getMainItems);

export function* itemsSaga(): Generator {
  yield takeLatest(getMainItems, getMainItemsSaga);
}
