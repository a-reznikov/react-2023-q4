import { createSlice } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface MessageState {
  error: string;
}

export type SetMessage = { payload: string; type: 'message/setMessage' };

type Select = (state: RootState) => string;

export interface MessageSlice {
  set: ActionCreatorWithPayload<string, 'message/setMessage'>;
  select: Select;
}

const initialState: MessageState = {
  error: '',
};

export const MessageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setMessage } = MessageSlice.actions;

export const selectMessage: Select = (state: RootState) => state.message.error;

export default MessageSlice.reducer;

export const Message: MessageSlice = {
  set: setMessage,
  select: selectMessage,
};
