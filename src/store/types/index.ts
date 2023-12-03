import { RootState } from '../store';

type Gender = 'male' | 'female';

export interface FormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: Gender;
}

export type SelectString = (state: RootState) => string;
export type SelectNumber = (state: RootState) => number;
export type SelectGender = (state: RootState) => Gender;

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
  password: {
    select: SelectString;
  };
  repeatPassword: {
    select: SelectString;
  };
  gender: {
    select: SelectGender;
  };
}
