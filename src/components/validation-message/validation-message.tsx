import { ValidationProps } from '../types';

const ValidationMessage: React.FC<ValidationProps> = (
  props: ValidationProps
): JSX.Element => {
  const { message } = props;

  return <p className="invalid-feedback">{message}</p>;
};

export default ValidationMessage;
