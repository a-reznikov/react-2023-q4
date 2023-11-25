import styles from './main.module.css';
import { WithChildrenProps } from '../types';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/router';
import { Search } from '@/store/reducers/search-slice';
import { useEffect } from 'react';
import { Details } from '@/store/reducers/details-slice';
import { Limit } from '@/store/reducers/limit-slice';
import { Pages } from '@/store/reducers/pages-slice';

const Main: React.FC<WithChildrenProps> = ({ children }): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { name, limit, page, id } = router.query;

  useEffect((): void => {
    dispatch(Search.set(`${name || ''}`));
  }, [dispatch, name]);

  useEffect((): void => {
    dispatch(Details.id.set(`${id || ''}`));
  }, [dispatch, id]);

  useEffect((): void => {
    dispatch(Limit.set(`${limit || '10'}`));
  }, [dispatch, limit]);

  useEffect((): void => {
    dispatch(Pages.page.set(`${page || '1'}`));
  }, [dispatch, page]);

  return <div className={`${styles.main} container-fluid`}>{children}</div>;
};

export default Main;
