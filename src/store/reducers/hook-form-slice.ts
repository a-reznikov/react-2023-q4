import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
  FormSlice,
  FormInput,
  SelectNumber,
  SelectString,
  SelectGender,
} from '../types';

const initialState: FormInput = {
  name: '',
  age: 0,
  email: '',
  password: '',
  repeatPassword: '',
  gender: 'male',
};

export const HookFormSlice = createSlice({
  name: 'hookForm',
  initialState,
  reducers: {
    setHookForm: (state, action: PayloadAction<FormInput>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.repeatPassword = action.payload.repeatPassword;
      state.gender = action.payload.gender;
    },
  },
});

export const { setHookForm } = HookFormSlice.actions;

export const selectName: SelectString = (state: RootState) =>
  state.hookForm.name;
export const selectAge: SelectNumber = (state: RootState) => state.hookForm.age;
export const selectEmail: SelectString = (state: RootState) =>
  state.hookForm.email;
export const selectPassword: SelectString = (state: RootState) =>
  state.hookForm.password;
export const selectRepeatPassword: SelectString = (state: RootState) =>
  state.hookForm.repeatPassword;
export const selectGender: SelectGender = (state: RootState) =>
  state.hookForm.gender;

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
  password: {
    select: selectPassword,
  },
  repeatPassword: {
    select: selectRepeatPassword,
  },
  gender: {
    select: selectGender,
  },
};
