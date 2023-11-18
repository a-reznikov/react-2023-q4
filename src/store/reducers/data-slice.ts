import { createSlice } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Character } from '../../components/types';

interface DataState {
  data: Character[];
  loader: boolean;
}

export type SetData = { payload: Character[]; type: 'data/setData' };
export type SetLoader = { payload: boolean; type: 'data/setLoader' };

type SelectCharacter = (state: RootState) => Character[];
type SelectLoader = (state: RootState) => boolean;

export interface DataSlice {
  data: {
    set: ActionCreatorWithPayload<Character[], 'data/setData'>;
    select: SelectCharacter;
  };
  loader: {
    set: ActionCreatorWithPayload<boolean, 'data/setLoader'>;
    select: SelectLoader;
  };
}

const initialState: DataState = {
  data: [],
  loader: false,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Character[]>) => {
      state.data = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export const { setLoader } = dataSlice.actions;

export const selectData: SelectCharacter = (state: RootState) =>
  state.data.data;
export const selectLoader: SelectLoader = (state: RootState) =>
  state.data.loader;

export default dataSlice.reducer;

export const Data: DataSlice = {
  data: {
    set: setData,
    select: selectData,
  },
  loader: {
    set: setLoader,
    select: selectLoader,
  },
};
