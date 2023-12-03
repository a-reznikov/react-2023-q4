import { Gender } from '../../store/types';

import { FormEvent } from 'react';

export type HasError = boolean;

export interface ErrorProps {
  message: string;
}

export interface ValidationProps {
  message: string | undefined;
}

export interface ErrorState {
  hasError: HasError;
  messageError: string;
}

export interface EmptyProps {}

export interface EmptyState {}

export type WithChildrenProps = {
  children: React.ReactNode;
};

export type EventForm = (event: FormEvent<HTMLFormElement>) => void;

export interface FormValidationInput {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: Gender;
  accept: boolean;
  picture: object;
  country: string;
}
