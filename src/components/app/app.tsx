import { Component } from 'react';
import { TransformPerson, EmptyProps, AppState } from '../types';
import { StateContext } from '../contexts';

import './app.css';
import Swapi from '../../services/swapi';
import Header from '../header';
import Main from '../main';
import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';

const swapi: Swapi = new Swapi();

export default class App extends Component<EmptyProps, AppState> {
  private setSearchTerm = (newTerm: string): void => {
    this.setState((state: AppState): AppState => {
      localStorage.setItem('termForSearching', newTerm);
      return {
        ...state,
        term: newTerm.trim(),
      };
    });
  };

  private searchPerson = (): void => {
    if (this.state.loading) return;

    this.setState({ loading: true });
    const { term } = this.state;

    swapi.search(term).then((response: TransformPerson[]): void => {
      this.setState(() => {
        return {
          people: response,
          loading: false,
        };
      });
    });
  };

  public state: AppState = {
    term: localStorage.getItem('termForSearching') || '',
    people: [],
    setSearchTerm: this.setSearchTerm,
    searchPerson: this.searchPerson,
    loading: false,
  };

  render(): JSX.Element {
    return (
      <ErrorBoundry>
        <StateContext.Provider value={this.state}>
          <div className="app">
            <Header />
            <Main />
            <ErrorButton />
          </div>
        </StateContext.Provider>
      </ErrorBoundry>
    );
  }
}
