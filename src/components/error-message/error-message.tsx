import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import styles from './error-message.module.css';
import errorIcon from '../../assets/icons/error.png';
import { ErrorProps } from '../types';

import './error-message.module.css';

const ErrorMessage: React.FC<ErrorProps> = (props: ErrorProps): JSX.Element => {
  const router: NextRouter = useRouter();
  function onReload(): void {
    router.push(`/?page=1&limit=10`);
  }

  const { message } = props;
  return (
    <div className={`${styles.errorMessage} card`}>
      <Image className={styles.errorIcon} src={errorIcon} alt="error icon" />
      <h2 className="title font-weight-bold text-warning">Grr!</h2>
      <p className="text-warning">{`The all-seeing eye found the problem!`}</p>
      <p className="text-warning">{`(don't worry, we've sent orcs to handle it)`}</p>
      <h5 className={`${styles.textInfo} text-info`}>
        {message ? message : `Please reload the page.`}
      </h5>
      <button className="btn btn-primary" onClick={onReload}>
        Back to Home
      </button>
    </div>
  );
};

export default ErrorMessage;
