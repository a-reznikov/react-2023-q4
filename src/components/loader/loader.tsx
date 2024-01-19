import { EmptyProps } from '../types';

const Loader: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="d-flex justify-content-center flex-grow-1 align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
