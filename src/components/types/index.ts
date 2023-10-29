export interface Person {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  url: string;
}

export interface TransformPerson {
  id: string;
  name: string;
  birthYear: string;
  gender: string;
  eyeColor: string;
  img: string;
}

export interface ResponseApi {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface AppState {
  term: string;
  people: TransformPerson[];
  setSearchTerm: (newTerm: string) => void;
  searchPerson: () => void;
  loading: boolean;
}
export interface ErrorState {
  hasError: boolean;
}

export interface EmptyProps {}

export interface EmptyState {}

export interface AppStateToProps {
  mainState: AppState;
}

export type WithChildrenProps = {
  children: React.ReactNode;
};
