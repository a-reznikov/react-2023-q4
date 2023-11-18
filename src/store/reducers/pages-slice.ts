import { createSlice } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface PagesState {
  page: string;
  lastPage: string;
}

export type SetPage = { payload: string; type: 'pages/setPage' };
export type SetLastPage = { payload: string; type: 'pages/setLastPage' };

type Select = (state: RootState) => string;

export interface PagesSlice {
  page: {
    set: ActionCreatorWithPayload<string, 'pages/setPage'>;
    init: string;
    select: Select;
  };
  lastPage: {
    set: ActionCreatorWithPayload<string, 'pages/setLastPage'>;
    select: Select;
  };
}

export const initPageStateValue: string = String(Date.now());

const initialState: PagesState = {
  page: initPageStateValue,
  lastPage: '',
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
    setLastPage: (state, action: PayloadAction<string>) => {
      state.lastPage = action.payload;
    },
  },
});

export const { setPage, setLastPage } = pagesSlice.actions;

export const selectPage: Select = (state: RootState) => state.pages.page;
export const selectLastPage: Select = (state: RootState) =>
  state.pages.lastPage;

export default pagesSlice.reducer;

export const Pages: PagesSlice = {
  page: {
    set: setPage,
    init: initPageStateValue,
    select: selectPage,
  },
  lastPage: {
    set: setLastPage,
    select: selectLastPage,
  },
};
