import * as yup from 'yup';

interface FileValue {
  size: number;
  type: string;
}

function generateStrengthMessage(value: number) {
  const levelStrength = 4 - value;
  if (levelStrength === 1) return 'Low strength';
  if (levelStrength === 2) return 'Medium strength';
  if (levelStrength === 3) return 'Last criterion';
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
    .test(
      'Password strength',
      'Password strength',
      function (password: string = ''): true | yup.ValidationError {
        const number = /[0-9]/;
        const lowercase = /[a-z]/;
        const uppercase = /[A-Z]/;
        const symbol = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

        const err = [];

        if (!number.test(password)) err.push('number');
        if (!lowercase.test(password)) err.push('lowercase letter');
        if (!uppercase.test(password)) err.push('uppercase letter');
        if (!symbol.test(password)) err.push('special character');

        if (err.length > 0) {
          return this.createError({
            message: `${generateStrengthMessage(
              err.length
            )}. Add to password one: ${err.join(', ')}`,
          });
        }
        return true;
      }
    ),
  repeatPassword: yup
    .string()
    .required('Repeat password is a required field')
    .test(
      'Password strength',
      'Password strength',
      function (password: string = ''): true | yup.ValidationError {
        const number = /[0-9]/;
        const lowercase = /[a-z]/;
        const uppercase = /[A-Z]/;
        const symbol = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

        const err = [];

        if (!number.test(password)) err.push('number');
        if (!lowercase.test(password)) err.push('lowercase letter');
        if (!uppercase.test(password)) err.push('uppercase letter');
        if (!symbol.test(password)) err.push('special character');

        if (err.length > 0) {
          return this.createError({
            message: `${generateStrengthMessage(
              err.length
            )}. Add to password one: ${err.join(', ')}`,
          });
        }
        return true;
      }
    )
    .oneOf([yup.ref('password')], 'The password does not match'),

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
  country: yup.string().required('Country is a required field'),
});

export default schema;
