import { createSlice } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface SearchState {
  term: string;
}

export type SetSearch = { payload: string; type: 'search/setSearch' };

type Select = (state: RootState) => string;

export interface SearchSlice {
  set: ActionCreatorWithPayload<string, 'search/setSearch'>;
  init: string;
  select: Select;
}

export const initSearchStateValue = String(Date.now());

const initialState: SearchState = {
  term: initSearchStateValue,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export const selectSearch: Select = (state: RootState) => state.search.term;

export default searchSlice.reducer;

export const Search: SearchSlice = {
  set: setSearch,
  init: initSearchStateValue,
  select: selectSearch,
};
