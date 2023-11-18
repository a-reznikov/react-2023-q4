import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface DetailsState {
  value: string;
}

export type SetDetailsID = { payload: string; type: 'details/setDetailsId' };

const initialState: DetailsState = {
  value: '',
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetailsId: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setDetailsId } = detailsSlice.actions;

export const selectDetails = (state: RootState) => state.details.value;

export default detailsSlice.reducer;
