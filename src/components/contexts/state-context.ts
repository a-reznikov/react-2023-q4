import React from 'react';
import { AppState } from '../types';

export const StateContext: React.Context<AppState> =
  React.createContext<AppState>({
    term: '',
    people: [],
    setSearchTerm: () => {},
    searchPerson: () => {},
    loading: false,
  });
