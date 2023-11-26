import { EmptyProps } from '../types';
import styles from './not-found.module.css';

const NotFoundPage: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <div className={styles.notFound}>
      <h1 className="text-warning">Page not found</h1>
      <p className="text-warning">{`(please check the URL)`}</p>
    </div>
  );
};

export default NotFoundPage;
