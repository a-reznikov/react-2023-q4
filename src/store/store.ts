import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './reducers/message-slice';
import formReducer from './reducers/form-slice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
