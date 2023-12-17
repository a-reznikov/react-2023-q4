import { ValidationError } from '../components/types';
import { ErrorsObject } from '../store/types';

export const errorHandler = (errors: ValidationError): ErrorsObject => {
  const Errors: ErrorsObject = {
    name: [],
    age: [],
    email: [],
    password: [],
    repeatPassword: [],
    gender: [],
    accept: [],
    picture: [],
    country: [],
  };

  Errors.name = errors.inner
    .filter((error) => (error.path === 'name' ? error.errors[0] : false))
    .map((error) => error.message);
  Errors.age = errors.inner
    .filter((error) => (error.path === 'age' ? error.errors[0] : false))
    .map((error) => error.message);
  Errors.email = errors.inner
    .filter((error) => (error.path === 'email' ? error.errors[0] : false))
    .map((error) => error.message);
  Errors.password = errors.inner
    .filter((error) => (error.path === 'password' ? error.errors[0] : false))
    .map((error) => error.message);
  Errors.repeatPassword = errors.inner
    .filter((error) =>
      error.path === 'repeatPassword' ? error.errors[0] : false
    )
    .map((error) => error.message);
  Errors.gender = errors.inner
    .filter((error) => (error.path === 'gender' ? error.errors[0] : false))
    .map((error) => error.message);
  Errors.accept = errors.inner
    .filter((error) => (error.path === 'accept' ? error.errors[0] : false))
    .map((error) => error.message);
  Errors.picture = errors.inner
    .filter((error) => (error.path === 'picture' ? error.errors[0] : false))
    .map((error) => error.message);
  Errors.country = errors.inner
    .filter((error) => (error.path === 'country' ? error.errors[0] : false))
    .map((error) => error.message);

  return Errors;
};
