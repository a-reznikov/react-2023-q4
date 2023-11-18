import { createSlice } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface DetailsState {
  value: string;
}

export type SetDetailsID = { payload: string; type: 'details/setDetailsId' };

type Select = (state: RootState) => string;

export interface DetailsIdSlice {
  set: ActionCreatorWithPayload<string, 'details/setDetailsId'>;
  select: Select;
}

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

export const selectDetails: Select = (state: RootState) => state.details.value;

export default detailsSlice.reducer;

export const DetailsId: DetailsIdSlice = {
  set: setDetailsId,
  select: selectDetails,
};
