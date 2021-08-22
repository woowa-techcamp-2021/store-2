import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest } from 'redux-saga/effects';
import * as itemsAPI from 'utils/api/items';
import axios, { AxiosResponse } from 'axios';
import { IItem } from 'types/item';
import { put } from 'redux-saga-test-plan/matchers';
import { finishLoading, startLoading } from './loading';

export interface IItemsState {
  categoryId?: string;
  pageId?: number;
  type?: string;
  search?: string;
}

interface IMainItems {
  popularItems: IItem[] | null;
  newItems: IItem[] | null;
  recommendItems: IItem[] | null;
}

interface IItemDetail {
  thumbnail: string;
  title: string;
  price: number;
  contents: string[];
  salePercent: number;
  isSoldOut: boolean;
  isLike: boolean;
  reviewCount: number;
}

interface StateProps {
  mainItems: {
    popularItems: IItem[] | null;
    newItems: IItem[] | null;
    recommendItems: IItem[] | null;
  };
  items: IItem[] | null;
  item: IItemDetail;
  error: null | string;
}

interface IError {
  errorMessage: string;
}

const initialState: StateProps = {
  mainItems: {
    popularItems: null,
    newItems: null,
    recommendItems: null,
  },
  items: null,
  item: {
    thumbnail: '',
    title: '',
    price: 0,
    salePercent: 0,
    contents: [],
    isSoldOut: false,
    isLike: false,
    reviewCount: 0,
  },
  error: null,
};

const counterSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    getMainItems: state => state,
    getMainItemsSuccess: (state, action: PayloadAction<string>) => {
      state.mainItems = action.payload as unknown as IMainItems;
    },
    getMainItemsFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
    getItems: state => state,
    getItemsSuccess: (state, action: PayloadAction<string>) => {
      state.items = action.payload as unknown as IItem[];
    },
    getItemsFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
    getItem: state => state,
    getItemSuccess: (state, action: PayloadAction<string>) => {
      state.item = action.payload as unknown as IItemDetail;
    },
    getItemFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
  },
});

const { actions, reducer: itemsReducer } = counterSlice;
const {
  getMainItems,
  getMainItemsSuccess,
  getMainItemsFail,
  getItems,
  getItemsSuccess,
  getItemsFail,
  getItem,
  getItemSuccess,
  getItemFail,
} = actions;
export { getMainItems, getItems, getItem, itemsReducer };

function* getMainItemsSaga(): Generator {
  try {
    yield put(startLoading(getMainItems.type));
    const { data } = (yield call(itemsAPI.getMainItems)) as AxiosResponse<IMainItems>;
    yield put({ type: getMainItemsSuccess.type, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getMainItemsFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getMainItems.type));
  }
}

function* getItemsSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getItems.type));
    const { data } = (yield call(itemsAPI.getItems, action.payload as unknown as IItemsState)) as AxiosResponse<
      IItem[]
    >;
    yield put({ type: getItemsSuccess.type, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getItemsFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getItems.type));
  }
}

function* getItemSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getItem.type));
    const { data } = (yield call(
      itemsAPI.getItem,
      action.payload as unknown as { id: string },
    )) as AxiosResponse<IItemDetail>;
    yield put({ type: getItemSuccess.type, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getItemFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getItem.type));
  }
}

export function* itemsSaga(): Generator {
  yield takeLatest(getMainItems, getMainItemsSaga);
  yield takeLatest(getItems, getItemsSaga);
  yield takeLatest(getItem, getItemSaga);
}
