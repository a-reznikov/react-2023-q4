import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { EmptyProps } from '../types';
import schema from '../../utils';
import ValidationMessage from '../validation-message';
import { useAppDispatch } from '../../store/hooks';
import { setHookForm } from '../../store/reducers/hook-form-slice';
import { FormInput } from '../../store/types';

const ReactHookForm: React.FC<EmptyProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ resolver: yupResolver(schema) });

  // const onChange = (e) => {
  //   console.log(e);
  // };

  const onSubmit = (data: FormInput) => {
    const { name, age, email, password, repeatPassword, gender } = data;

    dispatch(
      setHookForm({ name, age, email, password, repeatPassword, gender })
    );
  };

  return (
    <form className="position-relative" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="mx-auto p-2 w-50 p-3">
        <legend>Controlled Form</legend>
        <div className="form-group">
          <label htmlFor="inputName" className="form-label mt-4">
            Name
          </label>
          <input
            {...register('name')}
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="inputName"
            placeholder="Enter name"
          />
          {errors.name && <ValidationMessage message={errors.name.message} />}
        </div>
        <div className="form-group">
          <label htmlFor="inputAge" className="form-label mt-4">
            Age
          </label>
          <input
            {...register('age')}
            type="number"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            id="inputAge"
            placeholder="Enter age"
          />
          {errors.age && <ValidationMessage message={errors.age.message} />}
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="form-label mt-4">
            Email address
          </label>
          <input
            {...register('email')}
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="inputEmail"
            placeholder="Enter email"
          />
          {errors.email && <ValidationMessage message={errors.email.message} />}
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" className="form-label mt-4">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="inputPassword"
            placeholder="Password"
          />
          {errors.password && (
            <ValidationMessage message={errors.password.message} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="inputRepeatPassword" className="form-label mt-4">
            Repeat password
          </label>
          <input
            {...register('repeatPassword')}
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="inputRepeatPassword"
            placeholder="Password"
          />
          {errors.repeatPassword && (
            <ValidationMessage message={errors.repeatPassword.message} />
          )}
        </div>
        <fieldset className="form-group">
          <legend className={`mt-4 ${errors.gender ? 'is-invalid' : ''}`}>
            Gender
          </legend>
          <div className="form-check">
            <input
              {...register('gender')}
              className="form-check-input"
              type="radio"
              id="optionsGenderMale"
              value="male"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="optionsGenderMale">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              {...register('gender')}
              className="form-check-input"
              type="radio"
              id="optionsGenderFemale"
              value="female"
            />
            <label className="form-check-label" htmlFor="optionsGenderFemale">
              Female
            </label>
          </div>
          {errors.gender && (
            <ValidationMessage message={errors.gender.message} />
          )}
        </fieldset>
        {/* <fieldset className="form-group">
          <legend className="mt-4">Install viruses</legend>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="checkAccept"
            />
            <label className="form-check-label" htmlFor="checkAccept">
              I agree to install viruses and break my computer.
            </label>
          </div>
        </fieldset>
        <div className="form-group">
          <label htmlFor="formFile" className="form-label mt-4">
            Upload picture
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputCountry" className="form-label mt-4">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCountry"
            placeholder="Enter country"
          />
        </div> */}
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </fieldset>
    </form>
  );
};

export default ReactHookForm;
