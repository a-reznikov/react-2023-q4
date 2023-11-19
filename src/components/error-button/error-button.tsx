import { useState } from 'react';

import './error-button.css';
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
    <button className="error-button btn btn-danger btn-lg" onClick={onSetError}>
      Throw Error
    </button>
  );
};

export default ErrorButton;
