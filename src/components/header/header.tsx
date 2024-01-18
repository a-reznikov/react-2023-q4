import SearchBar from '../search-bar';

import Logo from '../../assets/icons/logo.png';

import './header.css';
import Pagination from '../pagination';
import { useAppDispatch } from '../../store/hooks';
import { SetDetailsId, Details } from '../../store/reducers/details-slice';

const Header: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <header
      className="header"
      onClick={(): SetDetailsId => dispatch(Details.id.set(''))}
    >
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
