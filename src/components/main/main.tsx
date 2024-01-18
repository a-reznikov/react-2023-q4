import './main.css';
import ItemList from '../item-list';

const Main: React.FC = (): JSX.Element => {
  return (
    <div className="main container-fluid">
      <ItemList />
    </div>
  );
};

export default Main;
