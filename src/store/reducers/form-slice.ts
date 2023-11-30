import { createSlice } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface FormState {
  name: string;
  age: number;
}

export type SetName = { payload: string; type: 'form/setName' };
export type SetAge = { payload: number; type: 'form/setAge' };

type SelectString = (state: RootState) => string;
type SelectNumber = (state: RootState) => number;

export interface FormSlice {
  Name: {
    set: ActionCreatorWithPayload<string, 'form/setName'>;
    select: SelectString;
  };
  Age: {
    set: ActionCreatorWithPayload<number, 'form/setAge'>;
    select: SelectNumber;
  };
}

const initialState: FormState = {
  name: '',
  age: 0,
};

export const FormsSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
  },
});

export const { setName, setAge } = FormsSlice.actions;

export const selectForm: SelectString = (state: RootState) => state.form.name;
export const selectAge: SelectNumber = (state: RootState) => state.form.age;

export default FormsSlice.reducer;

export const Forms: FormSlice = {
  Name: {
    set: setName,
    select: selectForm,
  },
  Age: {
    set: setAge,
    select: selectAge,
  },
};
