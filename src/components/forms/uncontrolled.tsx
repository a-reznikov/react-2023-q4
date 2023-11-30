import { EmptyProps } from '../types';

const Uncontrolled: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <form>
      <fieldset>
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
      </fieldset>
    </form>
  );
};

export default Uncontrolled;
