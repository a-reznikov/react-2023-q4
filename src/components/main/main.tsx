import { Context } from '../contexts';

import './main.css';
import ItemList from '../item-list';
import { EmptyProps } from '../types';

const Main: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="main container-fluid">
      <Context.Consumer>
        {(context) => {
          return <ItemList context={context} />;
        }}
      </Context.Consumer>
    </div>
  );
};

export default Main;
