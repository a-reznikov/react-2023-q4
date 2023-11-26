import { NextRouter, useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSearch, setSearch } from '../../store/reducers/search-slice';
import { Pages } from '../../store/reducers/pages-slice';

import { EmptyProps, EventChange, EventForm } from '../types';

const SearchBar: React.FC<EmptyProps> = (): JSX.Element => {
  const term: string = useAppSelector(selectSearch);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const dispatch = useAppDispatch();
  const page: string = useAppSelector(Pages.page.select);
  const router: NextRouter = useRouter();

  const firstPage: string = `1`;

  useEffect((): void => {
    setCurrentSearchTerm(term);
  }, [term]);

  const changeSearchTerm: EventChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentSearchTerm(event.target.value.trim());
  };

  function onPushTerm(page: string, term: string) {
    const params = new URLSearchParams(`${router.asPath}`.slice(1));
    if (page) {
      params.set('page', page);
    } else {
      params.delete('page');
    }
    if (term) {
      params.set('name', term);
    } else {
      params.delete('name');
    }
    params.delete('id');
    router.push(`?${params.toString()}`);
  }

  const onSearchTerm: EventForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (page !== firstPage) dispatch(Pages.page.set(firstPage));
    dispatch(setSearch(currentSearchTerm));
    onPushTerm(page, currentSearchTerm);
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
