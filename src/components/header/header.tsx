import { Context } from '../contexts';
import SearchBar from '../search-bar';
import { AppContextToProps } from '../types';
import Logo from '../../assets/icons/logo.png';

import './header.css';
import Pagination from '../pagination';

const Header: React.FC<AppContextToProps> = (
  props: AppContextToProps
): JSX.Element => {
  const {
    context: { setId },
  } = props;

  return (
    <header className="header" onClick={(): void => setId('')}>
      <div className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <img className="navbar-brand" src={Logo} />
          <Context.Consumer>
            {(context) => {
              return <SearchBar context={context} />;
            }}
          </Context.Consumer>
        </div>
      </div>
      <div className="control-panel container-fluid">
        <Context.Consumer>
          {(context) => {
            return <Pagination context={context} />;
          }}
        </Context.Consumer>
        <h2 className="text-center mb-3">Characters</h2>
      </div>
    </header>
  );
};

export default Header;
