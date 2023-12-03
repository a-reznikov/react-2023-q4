import { RootState } from '../store';

export type Gender = 'male' | 'female';

export interface FormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: Gender;
  accept: boolean;
  picture: string;
  country: string;
}

export type SelectString = (state: RootState) => string;
export type SelectNumber = (state: RootState) => number;
export type SelectGender = (state: RootState) => Gender;
export type SelectBoolean = (state: RootState) => boolean;
export type SelectArrayString = (state: RootState) => string[];
export type SelectMain = (state: RootState) => FormInput[];

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
  accept: {
    select: SelectBoolean;
  };
  picture: {
    select: SelectString;
  };
  country: {
    select: SelectString;
  };
}

export interface ErrorSlice {
  name: {
    select: SelectString;
  };
  age: {
    select: SelectString;
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
    select: SelectString;
  };
  accept: {
    select: SelectString;
  };
  picture: {
    select: SelectString;
  };
  country: {
    select: SelectString;
  };
}

export interface Countries {
  countries: string[];
}

export interface Main {
  forms: FormInput[];
}

export interface ErrorsObject {
  name: string[];
  age: string[];
  email: string[];
  password: string[];
  repeatPassword: string[];
  gender: string[];
  accept: string[];
  picture: string[];
  country: string[];
}

export interface ErrorsList {
  name: string;
  age: string;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  accept: string;
  picture: string;
  country: string;
}

export interface Current {
  current: { value: string };
}
