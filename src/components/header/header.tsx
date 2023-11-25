import Image from 'next/image';
import SearchBar from '../search-bar';
import { ResponseApi } from '../types';
import Logo from '../../assets/icons/logo.png';

import styles from './header.module.css';
import Pagination from '../pagination';
import { useEffect } from 'react';
import { Pages } from '@/store/reducers/pages-slice';
import { useAppDispatch } from '@/store/hooks';

const Header: React.FC<{ data: ResponseApi | undefined }> = ({
  data,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const lastPage = data ? `${data.pages}` : '';

  useEffect((): void => {
    dispatch(Pages.lastPage.set(lastPage));
  }, [dispatch, lastPage]);

  return (
    <header
      className="header"
      // onClick={(): SetDetailsId => dispatch(Details.id.set(''))}
    >
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
