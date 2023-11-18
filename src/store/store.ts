import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from './reducers/details-slice';
import searchReducer from './reducers/search-slice';
import limitReducer from './reducers/limit-slice';

export const store = configureStore({
  reducer: {
    details: detailsReducer,
    search: searchReducer,
    limit: limitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
