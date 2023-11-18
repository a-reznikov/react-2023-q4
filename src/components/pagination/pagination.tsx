import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

import './pagination.css';
import {
  AppContext,
  EmptyProps,
  EventChange,
  EventForm,
  FunctionVoid,
} from '../types';
import { Context } from '../contexts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Limit } from '../../store/reducers/limit-slice';

const Pagination: React.FC<EmptyProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const context: AppContext = useContext<AppContext>(Context);
  const limit: string = useAppSelector(Limit.select);
  const { page, setPage, lastPage } = context;
  const [currentLimit, setCurrentLimit] = useState<string>('');
  const firstPage: string = `1`;

  useEffect((): void => {
    setCurrentLimit(limit);
  }, [limit]);

  const onGetDataWithLimit: EventForm = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setPage(firstPage);
    dispatch(Limit.set(currentLimit));
  };

  const onSetLimit: EventChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentLimit(event.target.value.trim());
  };

  const onPrevPage: FunctionVoid = (): void => {
    const prevPage: string = `${+page - +firstPage}`;
    if (+page > +firstPage) {
      setPage(prevPage);
    }
  };

  const onNextPage: FunctionVoid = (): void => {
    const nextPage: string = `${+page + +firstPage}`;
    if (+page < +lastPage) {
      setPage(nextPage);
    }
  };

  return (
    <div className="pagination-bar">
      <ul className="pagination">
        <li
          className={`page-item ${+page > +firstPage ? '' : 'disabled'}`}
          onClick={onPrevPage}
          data-testid="page-prev"
        >
          <span className="page-link">&laquo;</span>
        </li>
        <li className="page-item active">
          <span className="page-link current-page">
            {page} . . . {lastPage}
          </span>
        </li>
        <li
          className={`page-item ${+page < +lastPage ? '' : 'disabled'}`}
          onClick={onNextPage}
          data-testid="page-next"
        >
          <span className="page-link">&raquo;</span>
        </li>
      </ul>
      <form className="limit input-group mb-3" onSubmit={onGetDataWithLimit}>
        <input
          type="number"
          className="form-control"
          placeholder="default 10..."
          onChange={onSetLimit}
          value={currentLimit}
          data-testid="limit-input"
        />
        <button
          className="btn btn-primary"
          type="submit"
          data-testid="set-limit"
        >
          Set limit
        </button>
      </form>
    </div>
  );
};

export default Pagination;
