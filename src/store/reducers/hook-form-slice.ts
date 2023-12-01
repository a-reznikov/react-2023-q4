import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface FormState {
  name: string;
  age: number;
  email: string;
}

type SelectString = (state: RootState) => string;
type SelectNumber = (state: RootState) => number;

export interface FormSlice {
  name: {
    select: SelectString;
  };
  age: {
    select: SelectNumber;
  };
  email: {
    select: SelectString;
  };
}

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
};

export const HookFormSlice = createSlice({
  name: 'hookForm',
  initialState,
  reducers: {
    setHookForm: (state, action: PayloadAction<FormState>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
    },
  },
});

export const { setHookForm } = HookFormSlice.actions;

export const selectName: SelectString = (state: RootState) =>
  state.hookForm.name;
export const selectAge: SelectNumber = (state: RootState) => state.hookForm.age;
export const selectEmail: SelectString = (state: RootState) =>
  state.hookForm.email;

export default HookFormSlice.reducer;

export const HookForm: FormSlice = {
  name: {
    select: selectName,
  },
  age: {
    select: selectAge,
  },
  email: {
    select: selectEmail,
  },
};
