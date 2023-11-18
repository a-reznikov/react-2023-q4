import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from './reducers/details-slice';
import searchReducer from './reducers/search-slice';
import limitReducer from './reducers/limit-slice';
import pagesReducer from './reducers/pages-slice';
import dataReducer from './reducers/data-slice';

export const store = configureStore({
  reducer: {
    details: detailsReducer,
    search: searchReducer,
    limit: limitReducer,
    data: dataReducer,
    pages: pagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
