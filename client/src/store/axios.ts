import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { check } from 'utils/api/auth';

export interface IUser {
  id: number;
  name: string;
}

interface ICategory {
  id: number;
  name: string;
}

interface IUserLoading {
  user: boolean;
  category: boolean;
}

type IIUser = undefined | null | IUser;

export interface StateProps {
  user: IIUser;
  category: undefined | [] | ICategory;
  loading: IUserLoading;
}

interface IObj {
  user: IUser;
}

const initialState: StateProps = { user: undefined, category: undefined, loading: { user: false, category: false } };

const counterSlice = createSlice({
  name: 'axios',
  initialState,
  reducers: {
    getUser: state => ({
      ...state,
      loading: {
        ...state.loading,
        user: true,
      },
    }),
    getUserSuccess: (state, action: PayloadAction<IUser>) => ({
      ...state,
      user: action.payload,
      loading: {
        ...state.loading,
        user: false,
      },
    }),
    getUserFail: state => ({
      ...state,
      user: null,
      loading: {
        ...state.loading,
        user: false,
      },
    }),
  },
});

export const { actions, reducer: axiosReducer } = counterSlice;
export const { getUser, getUserSuccess, getUserFail } = actions;

function* getUserSaga(): Generator {
  try {
    const {
      data: { user },
    } = (yield call(check)) as AxiosResponse<IObj>;
    yield put({
      type: getUserSuccess.type,
      payload: user,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      yield put({
        type: getUserFail.type,
        payload: e.response,
      });
    } else {
      throw new Error('axios saga code error');
    }
  }
}

export function* axiosSaga(): Generator {
  yield takeLatest(getUser, getUserSaga);
}
