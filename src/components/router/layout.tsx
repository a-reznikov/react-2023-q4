import { Outlet } from 'react-router';

import { EmptyProps } from '../types';

const Layout: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="app">
      <h2 className="text-3xl font-bold underline">Header</h2>
      <Outlet />
    </div>
  );
};

export default Layout;
