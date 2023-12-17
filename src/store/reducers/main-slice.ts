import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { FormInput, Main, SelectMain } from '../types';

const initialState: Main = {
  forms: [],
};

export const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMain: (state, action: PayloadAction<FormInput>) => {
      const mainForms = state.forms;
      mainForms.push(action.payload);
      state.forms = mainForms;
    },
  },
});

export const { setMain } = MainSlice.actions;

export const selectMain: SelectMain = (state: RootState) => state.main.forms;

export default MainSlice.reducer;
