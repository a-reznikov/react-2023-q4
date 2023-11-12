import { ChangeEvent, FormEvent, useContext } from 'react';
import { AppContext, EmptyProps, EventChange, EventForm } from '../types';
import { Context } from '../contexts';

const SearchBar: React.FC<EmptyProps> = (): JSX.Element => {
  const context: AppContext = useContext<AppContext>(Context);
  const { term, page, setTerm, searchData, setPage } = context;
  const firstPage: string = `1`;

  const changeSearchTerm: EventChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setTerm(event.target.value.trim());
  };

  const searchTerm: EventForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (page !== firstPage) setPage(firstPage);
    else searchData();
  };

  return (
    <form
      className="search-bar d-flex align-items-center"
      onSubmit={searchTerm}
    >
      <input
        className="form-control me-sm-2"
        id="search-input"
        type="search"
        placeholder="search character by name"
        onChange={changeSearchTerm}
        value={term}
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
