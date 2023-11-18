import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface SearchState {
  value: string;
}

export type SetSearch = { payload: string; type: 'search/setSearch' };

export const initSearchStateValue = String(Date.now());

const initialState: SearchState = {
  value: initSearchStateValue,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search.value;

export default searchSlice.reducer;
