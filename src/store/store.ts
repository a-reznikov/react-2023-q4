import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from './reducers/details-slice';
import searchReducer from './reducers/search-slice';

export const store = configureStore({
  reducer: {
    details: detailsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
