import { ChangeEvent, FormEvent } from 'react';
import { AppContextToProps, EventChange, EventForm } from '../types';

const SearchBar: React.FC<AppContextToProps> = (
  props: AppContextToProps
): JSX.Element => {
  const {
    context: { term, page, setTerm, searchData, setPage },
  } = props;
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
      ></input>
      <button className="btn btn-secondary my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
