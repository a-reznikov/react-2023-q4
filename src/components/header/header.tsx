import { Component } from 'react';
import { StateContext } from '../contexts';
import SearchBar from '../search-bar';
import { EmptyState, EmptyProps } from '../types';

export default class Header extends Component<EmptyProps, EmptyState> {
  render(): JSX.Element {
    return (
      <div
        className="header navbar navbar-expand-lg bg-dark"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <span className="navbar-brand">Swapi Characters DB </span>
          <StateContext.Consumer>
            {(state) => {
              return <SearchBar mainState={state} />;
            }}
          </StateContext.Consumer>
        </div>
      </div>
    );
  }
}
