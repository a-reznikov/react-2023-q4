import { EmptyProps } from '../types';
import './not-found.css';

const NotFoundPage: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className="not-found">
      <h1 className="text-warning">Page not found</h1>
      <p className="text-warning">{`(please check the URL)`}</p>
    </div>
  );
};

export default NotFoundPage;
