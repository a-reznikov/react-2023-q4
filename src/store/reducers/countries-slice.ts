import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Countries, SelectArrayString } from '../types';

const initialState: Countries = {
  countries: [],
};

export const CountriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = CountriesSlice.actions;

export const selectCountries: SelectArrayString = (state: RootState) =>
  state.countries.countries;

export default CountriesSlice.reducer;
