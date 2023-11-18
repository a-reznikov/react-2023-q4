import React from 'react';
import { AppContext } from '../types';

export const Context: React.Context<AppContext> =
  React.createContext<AppContext>({
    data: [],
    itemData: [],
    limit: '',
    page: '',
    lastPage: '',
    loading: false,
    loadingItem: false,
    messageError: '',
    setLimit: (): void => {},
    setPage: (): void => {},
    searchData: (): void => {},
  });
