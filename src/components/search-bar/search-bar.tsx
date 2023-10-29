import { MouseEvent, ChangeEvent, Component } from 'react';
import { EmptyState, AppStateToProps } from '../types';

export default class SearchBar extends Component<AppStateToProps, EmptyState> {
  private changeSearchTerm = (event: ChangeEvent<HTMLInputElement>): void => {
    const {
      mainState: { setSearchTerm },
    } = this.props;

    setSearchTerm(event.target.value);
  };

  private searchTerm = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const {
      mainState: { searchPerson },
    } = this.props;

    searchPerson();
  };

  render(): JSX.Element {
    const {
      mainState: { term },
    } = this.props;

    return (
      <form className="search-bar d-flex align-items-center">
        <input
          className="form-control me-sm-2"
          id="search-input"
          type="search"
          placeholder="search character by name"
          onChange={this.changeSearchTerm}
          value={term}
        ></input>
        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="submit"
          onClick={this.searchTerm}
        >
          Search
        </button>
      </form>
    );
  }
}
