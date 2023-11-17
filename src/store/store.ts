import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from './reducers/detailsSlice';

export const store = configureStore({
  reducer: {
    details: detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
