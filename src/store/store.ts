import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './reducers/message-slice';
import hookFormReducer from './reducers/hook-form-slice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    hookForm: hookFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
