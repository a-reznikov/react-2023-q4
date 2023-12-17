import React, { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmptyProps, FormValidationInput, ValidationError } from '../types';
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
import { Current, FormInput } from '../../store/types';
import { errorHandler } from '../../utils/validation-error-handler';
import { ErrorsSelects, setErrors } from '../../store/reducers/errors-slice';

const Uncontrolled: React.FC<EmptyProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errName = useAppSelector(ErrorsSelects.name.select);
  const errAge = useAppSelector(ErrorsSelects.age.select);
  const errEmail = useAppSelector(ErrorsSelects.email.select);
  const errPassword = useAppSelector(ErrorsSelects.password.select);
  const errRepeatPassword = useAppSelector(ErrorsSelects.repeatPassword.select);
  const errGender = useAppSelector(ErrorsSelects.gender.select);
  const errAccept = useAppSelector(ErrorsSelects.accept.select);
  const errPicture = useAppSelector(ErrorsSelects.picture.select);
  const errCountry = useAppSelector(ErrorsSelects.country.select);

  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputRepeatPassword = useRef<HTMLInputElement>(null);
  const inputGender = useRef<HTMLInputElement>(null);
  const inputGenderFemale = useRef<HTMLInputElement>(null);
  const inputAccept = useRef<HTMLInputElement>(null);
  const inputPicture = useRef<HTMLInputElement>(null);
  const inputCountry = useRef<HTMLInputElement>(null);

  const picture = useAppSelector(HookForm.picture.select);
  const foundedCountries = useAppSelector(selectCountries);

  const preparePicture = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

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

  const prepareCountries = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchCountries(event.target.value);
  };

  const onSetCountry = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLElement && isCurrentInRef(inputCountry)) {
      inputCountry.current.value = e.target.innerText;
      dispatch(setCountries([]));
    }
  };

  const isCurrentInRef = (obj: unknown): obj is Current => {
    if (
      typeof obj === 'object' &&
      obj &&
      'current' in obj &&
      typeof obj.current === 'object' &&
      obj.current &&
      'value' in obj.current &&
      typeof obj.current.value === 'string'
    )
      return true;
    return false;
  };

  const checkValidityForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputName) {
      const validForm: FormValidationInput = {
        name: isCurrentInRef(inputName) ? inputName.current.value : '',
        age: isCurrentInRef(inputAge) ? +inputAge.current.value : -1,
        email: isCurrentInRef(inputEmail) ? inputEmail.current.value : '',
        password: isCurrentInRef(inputPassword)
          ? inputPassword.current.value
          : '',
        repeatPassword: isCurrentInRef(inputRepeatPassword)
          ? inputRepeatPassword.current.value
          : '',
        gender:
          isCurrentInRef(inputGender) &&
          isCurrentInRef(inputGenderFemale) &&
          inputGender.current.checked
            ? 'male'
            : 'female',
        accept: isCurrentInRef(inputAccept)
          ? inputAccept.current.checked
          : false,
        picture:
          isCurrentInRef(inputPicture) && inputPicture.current.files
            ? inputPicture.current.files
            : {},
        country: isCurrentInRef(inputCountry) ? inputCountry.current.value : '',
      };
      try {
        await schema.validate(validForm, { abortEarly: false });
        const validData: FormInput = { ...validForm, picture };
        onSubmit(validData);
      } catch (error) {
        dispatch(setErrors(errorHandler(error as ValidationError)));
      }
    }
  };

  const onSubmit = (validForm: FormInput) => {
    dispatch(setHookForm(validForm));
    dispatch(setMain(validForm));
    navigate('/');
  };

  return (
    <form className="position-relative" onSubmit={checkValidityForm}>
      <fieldset className="mx-auto p-2 w-50 p-3">
        <legend>Uncontrolled Form</legend>
        <div className="form-group" style={{ minHeight: '95px' }}>
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            ref={inputName}
            type="text"
            className={`form-control ${errName ? 'is-invalid' : ''}`}
            id="inputName"
            placeholder="Enter name"
          />
          {errName && <ValidationMessage message={errName} />}
        </div>
        <div className="form-group" style={{ minHeight: '95px' }}>
          <label htmlFor="inputAge" className="form-label">
            Age
          </label>
          <input
            ref={inputAge}
            type="number"
            className={`form-control ${errAge ? 'is-invalid' : ''}`}
            id="inputAge"
            placeholder="Enter age"
          />
          {errAge && <ValidationMessage message={errAge} />}
        </div>
        <div className="form-group" style={{ minHeight: '95px' }}>
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            ref={inputEmail}
            type="email"
            className={`form-control ${errEmail ? 'is-invalid' : ''}`}
            id="inputEmail"
            placeholder="Enter email"
          />
          {errEmail && <ValidationMessage message={errEmail} />}
        </div>
        <div className="form-group" style={{ minHeight: '116px' }}>
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            ref={inputPassword}
            type="password"
            className={`form-control ${errPassword ? 'is-invalid' : ''}`}
            id="inputPassword"
            placeholder="Password"
          />
          {errPassword && <ValidationMessage message={errPassword} />}
        </div>
        <div className="form-group" style={{ minHeight: '116px' }}>
          <label htmlFor="inputRepeatPassword" className="form-label">
            Repeat password
          </label>
          <input
            ref={inputRepeatPassword}
            type="password"
            className={`form-control ${errRepeatPassword ? 'is-invalid' : ''}`}
            id="inputRepeatPassword"
            placeholder="Password"
          />
          {errRepeatPassword && (
            <ValidationMessage message={errRepeatPassword} />
          )}
        </div>
        <fieldset className="form-group" style={{ minHeight: '95px' }}>
          <legend className={`${errGender ? 'is-invalid' : ''}`}>Gender</legend>
          <div className="form-check">
            <input
              ref={inputGender}
              className="form-check-input"
              type="radio"
              name="radio"
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
              ref={inputGenderFemale}
              className="form-check-input"
              type="radio"
              name="radio"
              id="optionsGenderFemale"
              value="female"
            />
            <label className="form-check-label" htmlFor="optionsGenderFemale">
              Female
            </label>
          </div>
          {errGender && <ValidationMessage message={errGender} />}
        </fieldset>
        <fieldset className="form-group" style={{ minHeight: '117px' }}>
          <legend className={`mt-2 ${errAccept ? 'is-invalid' : ''}`}>
            Install viruses
          </legend>
          <div className="form-check">
            <input
              ref={inputAccept}
              className="form-check-input"
              type="checkbox"
              id="checkAccept"
            />
            <label className="form-check-label" htmlFor="checkAccept">
              I agree to install viruses and break my computer.
            </label>
          </div>
          {errAccept && <ValidationMessage message={errAccept} />}
        </fieldset>
        <div className="form-group" style={{ minHeight: '95px' }}>
          <label
            htmlFor="formFile"
            className={`form-label ${errPicture ? 'is-invalid' : ''}`}
          >
            Upload picture
          </label>
          <input
            ref={inputPicture}
            className="form-control"
            type="file"
            id="formFile"
            onChange={preparePicture}
          />
          {errPicture && <ValidationMessage message={errPicture} />}
        </div>
        <div className="form-group" style={{ minHeight: '184px' }}>
          <label htmlFor="inputCountry" className="form-label mt-2">
            Country
          </label>
          <input
            ref={inputCountry}
            type="text"
            className={`form-control ${errCountry ? 'is-invalid' : ''}`}
            id="inputCountry"
            placeholder="Enter country"
            onChange={prepareCountries}
          />
          {errCountry && <ValidationMessage message={errCountry} />}
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
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </fieldset>
    </form>
  );
};

export default Uncontrolled;
