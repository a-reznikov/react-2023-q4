import React from 'react';
import { AppContext } from '../types';

export const Context: React.Context<AppContext> =
  React.createContext<AppContext>({
    data: [],
    itemData: [],
    page: '',
    lastPage: '',
    loading: false,
    loadingItem: false,
    messageError: '',
    setPage: (): void => {},
    searchData: (): void => {},
  });
