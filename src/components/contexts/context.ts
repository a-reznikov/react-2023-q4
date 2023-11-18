import React from 'react';
import { AppContext } from '../types';

export const Context: React.Context<AppContext> =
  React.createContext<AppContext>({
    page: '',
    lastPage: '',
    messageError: '',
    setPage: (): void => {},
  });
