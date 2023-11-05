import Header from '../header';
import ErrorButton from '../error-button';
import { Outlet } from 'react-router';
import { EmptyProps } from '../types';
import { Context } from '../contexts';

const Layout: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="app">
      <Context.Consumer>
        {(context) => {
          return <Header context={context} />;
        }}
      </Context.Consumer>
      <Outlet />
      <ErrorButton />
    </div>
  );
};

export default Layout;
