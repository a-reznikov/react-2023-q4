import React from 'react';
import { AppContext } from '../types';

export const Context: React.Context<AppContext> =
  React.createContext<AppContext>({
    term: '',
    data: [],
    itemData: [],
    id: '',
    limit: '',
    page: '',
    lastPage: '',
    loading: false,
    loadingItem: false,
    messageError: '',
    setTerm: (): void => {},
    setLimit: (): void => {},
    setPage: (): void => {},
    setId: (): void => {},
    searchData: (): void => {},
  });
