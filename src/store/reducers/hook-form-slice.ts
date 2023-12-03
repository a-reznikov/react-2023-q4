import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
  FormSlice,
  FormInput,
  SelectNumber,
  SelectString,
  SelectGender,
  SelectBoolean,
} from '../types';

const initialState: FormInput = {
  name: '',
  age: 0,
  email: '',
  password: '',
  repeatPassword: '',
  gender: 'male',
  accept: false,
  picture: '',
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
      state.accept = action.payload.accept;
      state.picture = action.payload.picture;
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
export const selectAccept: SelectBoolean = (state: RootState) =>
  state.hookForm.accept;
export const selectPicture: SelectString = (state: RootState) =>
  state.hookForm.repeatPassword;

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
  accept: {
    select: selectAccept,
  },
  picture: {
    select: selectPicture,
  },
};
