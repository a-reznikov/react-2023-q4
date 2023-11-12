import { Context } from '../contexts';
import SearchBar from '../search-bar';
import { AppContext, EmptyProps } from '../types';
import Logo from '../../assets/icons/logo.png';

import './header.css';
import Pagination from '../pagination';
import { useContext } from 'react';

const Header: React.FC<EmptyProps> = (): JSX.Element => {
  const context: AppContext = useContext<AppContext>(Context);
  const { setId } = context;

  return (
    <header className="header" onClick={(): void => setId('')}>
      <div className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <img className="navbar-brand" src={Logo} />
          <SearchBar />
        </div>
      </div>
      <div className="control-panel container-fluid">
        <Pagination />
        <h2 className="text-center mb-3">Characters</h2>
      </div>
    </header>
  );
};

export default Header;
