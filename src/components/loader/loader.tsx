import { EmptyProps } from '../types';
import styles from './loader.module.css';

const Loader: React.FC<EmptyProps> = (): JSX.Element => {
  return <span className={styles.loader} data-testid="loader"></span>;
};

export default Loader;
