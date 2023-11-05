import { ChangeEvent, FormEvent } from 'react';
import { Errors, ApiKeys } from './constants';

export interface Character {
  _id: string;
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
}

export interface ResponseApi {
  docs: Character[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export type ReactSet = (value: React.SetStateAction<string>) => void;

export type EventForm = (event: FormEvent<HTMLFormElement>) => void;

export type EventChange = (event: ChangeEvent<HTMLInputElement>) => void;

export type FunctionVoid = () => void;

export interface AppContext {
  term: string;
  data: Character[];
  itemData: Character[];
  id: string;
  limit: string;
  page: string;
  lastPage: string;
  loading: boolean;
  loadingItem: boolean;
  messageError: string;
  setTerm: ReactSet;
  setLimit: ReactSet;
  setPage: ReactSet;
  setId: ReactSet;
  searchData: () => void;
}

export type ItemDetailsProps = {
  loadingItem: boolean;
  setId: ReactSet;
  itemData: Character[];
};

export type HasError = boolean;

export interface ErrorProps {
  message: string;
}

export interface ErrorState {
  hasError: HasError;
  messageError: string;
}

export interface EmptyProps {}

export interface EmptyState {}

export interface AppContextToProps {
  context: AppContext;
}

export type WithChildrenProps = {
  children: React.ReactNode;
};

export interface Query {
  [key: string]: string;
}

export interface ErrorFetch {
  message: string;
  code: string;
}

export { Errors, ApiKeys };
