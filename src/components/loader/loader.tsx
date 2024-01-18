import './loader.css';
import { EmptyProps } from '../types';

const Loader: React.FC<EmptyProps> = (): JSX.Element => {
  return <span className="loader" data-testid="loader"></span>;
};

export default Loader;
