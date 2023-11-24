import { useState } from 'react';

import styles from './error-button.module.css';
import { EmptyProps, HasError } from '../types';

const ErrorButton: React.FC<EmptyProps> = (): JSX.Element => {
  const [hasError, setHasError] = useState<HasError>(false);

  function onSetError(): void {
    setHasError(true);
  }

  if (hasError) {
    throw new Error('Oops! Something bad happened!');
  }

  return (
    <button
      className={`${styles.errorButton} btn btn-danger btn-lg`}
      onClick={onSetError}
    >
      Throw Error
    </button>
  );
};

export default ErrorButton;
