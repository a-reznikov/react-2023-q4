import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[A-ZА-Я]+/, 'The first letter must be uppercase'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is a required field')
    .positive('Age must be a positive number'),
});

export default schema;
