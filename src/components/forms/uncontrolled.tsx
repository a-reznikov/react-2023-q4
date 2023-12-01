import { EmptyProps } from '../types';

const Uncontrolled: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <form className="position-relative">
      <fieldset className="mx-auto p-2 w-50 p-3">
        <legend>Uncontrolled Form</legend>
        <div className="form-group">
          <label htmlFor="inputName" className="form-label mt-4">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAge" className="form-label mt-4">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="inputAge"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputRepeatPassword" className="form-label mt-4">
            Repeat password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputRepeatPassword"
            placeholder="Password"
          />
        </div>
        <fieldset className="form-group">
          <legend className="mt-4">Gender</legend>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="optionsGender"
              id="optionsGenderMale"
              value="male"
            />
            <label className="form-check-label" htmlFor="optionsGenderMale">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="optionsGender"
              id="optionsGenderFemale"
              value="female"
            />
            <label className="form-check-label" htmlFor="optionsGenderFemale">
              Female
            </label>
          </div>
        </fieldset>
        <fieldset className="form-group">
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
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </fieldset>
    </form>
  );
};

export default Uncontrolled;
