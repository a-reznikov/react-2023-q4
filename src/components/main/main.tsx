import './main.css';
import ItemList from '../item-list';
import { EmptyProps } from '../types';

const Main: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="main container-fluid">
      <ItemList />
    </div>
  );
};

export default Main;
