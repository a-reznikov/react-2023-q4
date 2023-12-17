import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { EmptyProps, FormValidationInput } from '../types';
import schema from '../../utils';
import ValidationMessage from '../validation-message';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  HookForm,
  setHookForm,
  setPicture,
} from '../../store/reducers/hook-form-slice';
import { converterToBase64 } from '../../utils/converter';
import { countryList } from '../../data/countries';
import {
  selectCountries,
  setCountries,
} from '../../store/reducers/countries-slice';
import { setMain } from '../../store/reducers/main-slice';
import { FormInput } from '../../store/types';

const ReactHookForm: React.FC<EmptyProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValidationInput>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const picture = useAppSelector(HookForm.picture.select);
  const foundedCountries = useAppSelector(selectCountries);

  register('picture', {
    onChange: async (event) => {
      if (
        'files' in event.target &&
        event.target.files &&
        event.target.files.length
      ) {
        const file: File = event.target.files[0];
        const convertedPicture = await converterToBase64(file);
        if (typeof convertedPicture === 'string')
          dispatch(setPicture(convertedPicture));
      }
    },
  });

  const searchCountries = (text: string) => {
    if (!text) {
      dispatch(setCountries([]));
    } else {
      const matches: string[] = countryList.filter((country) => {
        const regex = new RegExp(`${text.toLowerCase()}`);
        return country.toLowerCase().match(regex);
      });
      dispatch(setCountries(matches));
    }
  };

  register('country', {
    onChange: (event) => {
      searchCountries(event.target.value);
    },
  });

  const onSetCountry = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLElement) {
      setValue('country', e.target.innerText);
      dispatch(setCountries([]));
    }
  };

  const onSubmit = (data: FormValidationInput) => {
    const {
      name,
      age,
      email,
      password,
      repeatPassword,
      gender,
      accept,
      country,
    } = data;

    const validForm: FormInput = {
      name,
      age,
      email,
      password,
      repeatPassword,
      gender,
      accept,
      picture,
      country,
    };
    dispatch(setHookForm(validForm));
    dispatch(setMain(validForm));
    navigate('/');
  };

  return (
    <form className="position-relative" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="mx-auto p-2 w-50 p-3">
        <legend>Controlled Form</legend>
        <div className="form-group" style={{ minHeight: '95px' }}>
          <label htmlFor="inputName" className="form-label">
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
        <div className="form-group" style={{ minHeight: '95px' }}>
          <label htmlFor="inputAge" className="form-label">
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
        <div className="form-group" style={{ minHeight: '95px' }}>
          <label htmlFor="inputEmail" className="form-label">
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
        <div className="form-group" style={{ minHeight: '116px' }}>
          <label htmlFor="inputPassword" className="form-label">
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
        <div className="form-group" style={{ minHeight: '116px' }}>
          <label htmlFor="inputRepeatPassword" className="form-label">
            Repeat password
          </label>
          <input
            {...register('repeatPassword')}
            type="password"
            className={`form-control ${
              errors.repeatPassword ? 'is-invalid' : ''
            }`}
            id="inputRepeatPassword"
            placeholder="Password"
          />
          {errors.repeatPassword && (
            <ValidationMessage message={errors.repeatPassword.message} />
          )}
        </div>
        <fieldset className="form-group" style={{ minHeight: '95px' }}>
          <legend className={`${errors.gender ? 'is-invalid' : ''}`}>
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
        <fieldset className="form-group" style={{ minHeight: '117px' }}>
          <legend className={`mt-2 ${errors.accept ? 'is-invalid' : ''}`}>
            Install viruses
          </legend>
          <div className="form-check">
            <input
              {...register('accept')}
              className="form-check-input"
              type="checkbox"
              value=""
              id="checkAccept"
            />
            <label className="form-check-label" htmlFor="checkAccept">
              I agree to install viruses and break my computer.
            </label>
          </div>
          {errors.accept && (
            <ValidationMessage message={errors.accept.message} />
          )}
        </fieldset>
        <div className="form-group" style={{ minHeight: '95px' }}>
          <label
            htmlFor="formFile"
            className={`form-label ${errors.picture ? 'is-invalid' : ''}`}
          >
            Upload picture
          </label>
          <input
            {...register('picture')}
            className="form-control"
            type="file"
            id="formFile"
          />
          {errors.picture && (
            <ValidationMessage message={errors.picture.message} />
          )}
        </div>
        <div className="form-group" style={{ minHeight: '184px' }}>
          <label htmlFor="inputCountry" className="form-label mt-2">
            Country
          </label>
          <input
            {...register('country')}
            type="text"
            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
            id="inputCountry"
            placeholder="Enter country"
          />
          {errors.country && (
            <ValidationMessage message={errors.country.message} />
          )}
          <div
            className="form-group overflow-auto h-50px"
            style={{ height: '80px' }}
          >
            {foundedCountries &&
              foundedCountries.map((country, index) => (
                <div
                  className="mt-1"
                  key={index}
                  onClick={(e) => onSetCountry(e)}
                >
                  {country}
                </div>
              ))}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={!isValid}
        >
          Submit
        </button>
      </fieldset>
    </form>
  );
};

export default ReactHookForm;
