import { createSlice } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Character } from '../../components/types';

interface DetailsState {
  id: string;
  data: Character[];
  loader: boolean;
}

export type SetDetailsId = { payload: string; type: 'details/setId' };
export type SetData = { payload: Character[]; type: 'details/setData' };
export type SetLoader = { payload: boolean; type: 'details/setLoader' };

type Select = (state: RootState) => string;
type SelectCharacter = (state: RootState) => Character[];
type SelectLoader = (state: RootState) => boolean;

export interface DetailsSlice {
  id: {
    set: ActionCreatorWithPayload<string, 'details/setId'>;
    select: Select;
  };
  data: {
    set: ActionCreatorWithPayload<Character[], 'details/setData'>;
    select: SelectCharacter;
  };
  loader: {
    set: ActionCreatorWithPayload<boolean, 'details/setLoader'>;
    select: SelectLoader;
  };
}

const initialState: DetailsState = {
  id: '',
  data: [],
  loader: false,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setData: (state, action: PayloadAction<Character[]>) => {
      state.data = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
  },
});

export const { setId } = detailsSlice.actions;
export const { setData } = detailsSlice.actions;
export const { setLoader } = detailsSlice.actions;

export const selectDetailsId: Select = (state: RootState) => state.details.id;
export const selectData: SelectCharacter = (state: RootState) =>
  state.details.data;
export const selectLoader: SelectLoader = (state: RootState) =>
  state.details.loader;

export const Details: DetailsSlice = {
  id: {
    set: setId,
    select: selectDetailsId,
  },
  data: {
    set: setData,
    select: selectData,
  },
  loader: {
    set: setLoader,
    select: selectLoader,
  },
};

export default detailsSlice.reducer;
