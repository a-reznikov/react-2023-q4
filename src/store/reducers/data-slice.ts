import { createSlice } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Character } from '../../components/types';

interface DataState {
  value: Character[];
}

export type SetData = { payload: Character[]; type: 'data/setData' };

type Select = (state: RootState) => Character[];

export interface DataSlice {
  set: ActionCreatorWithPayload<Character[], 'data/setData'>;
  select: Select;
}

const initialState: DataState = {
  value: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Character[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;

export const selectData: Select = (state: RootState) => state.data.value;

export default dataSlice.reducer;

export const Data: DataSlice = {
  set: setData,
  select: selectData,
};
