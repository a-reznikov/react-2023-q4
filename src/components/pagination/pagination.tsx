import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import styles from './pagination.module.css';
import { EmptyProps, EventChange, EventForm, FunctionVoid } from '../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Limit } from '../../store/reducers/limit-slice';
import { Pages } from '../../store/reducers/pages-slice';
import { useRouter } from 'next/router';

const Pagination: React.FC<EmptyProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const limit: string = useAppSelector(Limit.select);
  const page: string = useAppSelector(Pages.page.select);
  const lastPage: string = useAppSelector(Pages.lastPage.select);

  const [currentLimit, setCurrentLimit] = useState<string>('');
  const firstPage: string = `1`;

  useEffect((): void => {
    setCurrentLimit(limit);
  }, [limit]);

  function onPushLimit(page: string, limit: string) {
    const params = new URLSearchParams(`${router.asPath}`.slice(1));
    if (page) {
      params.set('page', page);
    } else {
      params.delete('page');
    }
    if (limit) {
      params.set('limit', limit);
    } else {
      params.delete('limit');
    }
    router.push(`?${params.toString()}`);
  }

  function onPushPage(page: string) {
    const params = new URLSearchParams(`${router.asPath}`.slice(1));
    if (page) {
      params.set('page', page);
    } else {
      params.delete('page');
    }
    router.push(`?${params.toString()}`);
  }

  const onGetDataWithLimit: EventForm = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    dispatch(Pages.page.set(firstPage));
    dispatch(Limit.set(currentLimit));
    onPushLimit(firstPage, currentLimit);
  };

  const onSetLimit: EventChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentLimit(event.target.value.trim());
  };

  const onPrevPage: FunctionVoid = (): void => {
    const prevPage: string = `${+page - +firstPage}`;
    if (+page > +firstPage) {
      dispatch(Pages.page.set(prevPage));
      onPushPage(prevPage);
    }
  };

  const onNextPage: FunctionVoid = (): void => {
    const nextPage: string = `${+page + +firstPage}`;
    if (+page < +lastPage) {
      dispatch(Pages.page.set(nextPage));
      onPushPage(nextPage);
    }
  };

  return (
    <div className={styles.paginationBar}>
      <ul className="pagination">
        <li
          className={`${styles.pageItem} page-item ${
            +page > +firstPage ? '' : 'disabled'
          }`}
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
          className={`${styles.pageItem} page-item ${
            +page < +lastPage ? '' : 'disabled'
          }`}
          onClick={onNextPage}
          data-testid="page-next"
        >
          <span className="page-link">&raquo;</span>
        </li>
      </ul>
      <form
        className={`${styles.limit} input-group mb-3`}
        onSubmit={onGetDataWithLimit}
      >
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
