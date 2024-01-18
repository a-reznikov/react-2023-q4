import Header from '../header';
import ErrorButton from '../error-button';
import { Outlet } from 'react-router';

const Layout: React.FC = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <ErrorButton />
    </div>
  );
};

export default Layout;
