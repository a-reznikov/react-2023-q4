import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { Pages } from '@/store/reducers/pages-slice';
import { Details } from '@/store/reducers/details-slice';

import styles from './header.module.css';
import Pagination from '../pagination';
import SearchBar from '../search-bar';
import { ResponseApi } from '../types';
import Logo from '../../assets/icons/logo.png';

const Header: React.FC<{ data: ResponseApi | undefined }> = ({
  data,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const lastPage = data ? `${data.pages}` : '';
  const router: NextRouter = useRouter();

  useEffect((): void => {
    dispatch(Pages.lastPage.set(lastPage));
  }, [dispatch, lastPage]);

  function onCloseDetails(): void {
    dispatch(Details.id.set(''));
    const params = new URLSearchParams(`${router.asPath}`.slice(1));
    params.delete('id');

    router.push(`?${params.toString()}`);
  }

  return (
    <header className="header" onClick={onCloseDetails}>
      <div className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Image className={styles.navbarBrand} src={Logo} alt="Logo" />
          <SearchBar />
        </div>
      </div>
      <div className={`${styles.controlPanel} container-fluid`}>
        <Pagination />
        <h2 className="text-center mb-3">Characters</h2>
      </div>
    </header>
  );
};

export default Header;
