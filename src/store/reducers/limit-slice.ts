import { createSlice } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface LimitState {
  value: string;
}

export type SetLimit = { payload: string; type: 'limit/setLimit' };

type Select = (state: RootState) => string;

export interface LimitSlice {
  set: ActionCreatorWithPayload<string, 'limit/setLimit'>;
  init: string;
  select: Select;
}

export const initLimitStateValue: string = String(Date.now());

const initialState: LimitState = {
  value: initLimitStateValue,
};

export const limitSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setLimit } = limitSlice.actions;

export const selectLimit: Select = (state: RootState) => state.limit.value;

export default limitSlice.reducer;

export const Limit: LimitSlice = {
  set: setLimit,
  init: initLimitStateValue,
  select: selectLimit,
};
