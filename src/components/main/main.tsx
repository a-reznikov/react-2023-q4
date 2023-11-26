import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';

import { Search } from '@/store/reducers/search-slice';
import { Limit } from '@/store/reducers/limit-slice';
import { Pages } from '@/store/reducers/pages-slice';

import styles from './main.module.css';
import { WithChildrenProps } from '../types';

const Main: React.FC<WithChildrenProps> = ({ children }): JSX.Element => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const { name, limit, page } = router.query;

  useEffect((): void => {
    dispatch(Search.set(`${name || ''}`));
  }, [dispatch, name]);

  useEffect((): void => {
    dispatch(Limit.set(`${limit || '10'}`));
  }, [dispatch, limit]);

  useEffect((): void => {
    dispatch(Pages.page.set(`${page || '1'}`));
  }, [dispatch, page]);

  return <div className={`${styles.main} container-fluid`}>{children}</div>;
};

export default Main;
