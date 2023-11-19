import Header from '../header';
import ErrorButton from '../error-button';
import { Outlet } from 'react-router';
import { EmptyProps } from '../types';

const Layout: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <ErrorButton />
    </div>
  );
};

export default Layout;
