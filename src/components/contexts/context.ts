import React from 'react';
import { AppContext } from '../types';

export const Context: React.Context<AppContext> =
  React.createContext<AppContext>({
    itemData: [],
    page: '',
    lastPage: '',
    loadingItem: false,
    messageError: '',
    setPage: (): void => {},
  });
