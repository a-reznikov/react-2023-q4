import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { ErrorSlice, ErrorsList, ErrorsObject, SelectString } from '../types';

const initialState: ErrorsList = {
  name: '',
  age: '',
  email: '',
  password: '',
  repeatPassword: '',
  gender: '',
  accept: '',
  picture: '',
  country: '',
};

export const ErrorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<ErrorsObject>) => {
      state.name = action.payload.name[0];
      state.age = action.payload.age[0];
      state.email = action.payload.email[0];
      state.password = action.payload.password[0];
      state.repeatPassword = action.payload.repeatPassword[0];
      state.gender = action.payload.gender[0];
      state.accept = action.payload.accept[0];
      state.picture = action.payload.picture[0];
      state.country = action.payload.country[0];
    },
  },
});

export const { setErrors } = ErrorsSlice.actions;

const selectName: SelectString = (state: RootState) => state.errors.name;
const selectAge: SelectString = (state: RootState) => state.errors.age;
const selectEmail: SelectString = (state: RootState) => state.errors.email;
const selectPassword: SelectString = (state: RootState) =>
  state.errors.password;
const selectRepeatPassword: SelectString = (state: RootState) =>
  state.errors.repeatPassword;
const selectGender: SelectString = (state: RootState) => state.errors.gender;
const selectAccept: SelectString = (state: RootState) => state.errors.accept;
const selectPicture: SelectString = (state: RootState) => state.errors.picture;
const selectCountry: SelectString = (state: RootState) => state.errors.country;

export default ErrorsSlice.reducer;

export const ErrorsSelects: ErrorSlice = {
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
  country: {
    select: selectCountry,
  },
};
