import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { AppContext, EmptyProps, EventChange, EventForm } from '../types';
import { Context } from '../contexts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSearch, setSearch } from '../../store/reducers/search-slice';

const SearchBar: React.FC<EmptyProps> = (): JSX.Element => {
  const searchTerm: string = useAppSelector(selectSearch);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const dispatch = useAppDispatch();
  const context: AppContext = useContext<AppContext>(Context);
  const { page, setPage } = context;
  const firstPage: string = `1`;

  useEffect(() => {
    setCurrentSearchTerm(searchTerm);
  }, [searchTerm]);

  const changeSearchTerm: EventChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentSearchTerm(event.target.value.trim());
  };

  const onSearchTerm: EventForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (page !== firstPage) setPage(firstPage);
    dispatch(setSearch(currentSearchTerm));
    localStorage.setItem('termForSearching', currentSearchTerm);
  };

  return (
    <form
      className="search-bar d-flex align-items-center"
      onSubmit={onSearchTerm}
    >
      <input
        className="form-control me-sm-2"
        id="search-input"
        type="search"
        placeholder="search character by name"
        onChange={changeSearchTerm}
        value={currentSearchTerm}
        data-testid="search-input"
      ></input>
      <button
        className="btn btn-secondary my-2 my-sm-0"
        type="submit"
        data-testid="search-button"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
