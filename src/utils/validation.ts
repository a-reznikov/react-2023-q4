import * as yup from 'yup';

interface FileValue {
  size: number;
  type: string;
}

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
  email: yup
    .string()
    .email('Email should be like example@mail.com')
    .required('Email is a required field'),
  password: yup
    .string()
    .required('Password is a required field')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]/,
      'The password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    ),
  repeatPassword: yup
    .string()
    .required('Repeat password is a required field')
    .oneOf([yup.ref('password')], 'The password does not match')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]/,
      'The password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    ),
  gender: yup
    .string()
    .oneOf(['male', 'female'])
    .required('Please choose your gender'),
  accept: yup
    .boolean()
    .oneOf([true], 'Please agree to the installation')
    .required('Filed is a required field'),
  picture: yup
    .mixed()
    .required('A file is required')
    .test('File not load', 'Please load file', (value) => {
      const valuePicture = value as FileValue[];
      return !!valuePicture.length;
    })
    .test('File size', 'The file size must be less than 2mb', (value) => {
      const valuePicture = value as FileValue[];
      return valuePicture[0] && valuePicture[0].size <= 2000000;
    })
    .test(
      'File extension',
      'The file extension must be jpeg or png',
      (value) => {
        const valuePicture = value as FileValue[];
        return (
          (valuePicture[0] && valuePicture[0].type === 'image/jpeg') ||
          (valuePicture[0] && valuePicture[0].type === 'image/png')
        );
      }
    ),
});

export default schema;
