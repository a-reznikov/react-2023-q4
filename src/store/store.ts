import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './reducers/message-slice';
import hookFormReducer from './reducers/hook-form-slice';
import countriesReducer from './reducers/countries-slice';
import mainReducer from './reducers/main-slice';
import errorsReducer from './reducers/errors-slice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    hookForm: hookFormReducer,
    countries: countriesReducer,
    main: mainReducer,
    errors: errorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
