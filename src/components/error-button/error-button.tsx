import { Component } from 'react';

import './error-button.css';
import { ErrorState, EmptyProps } from '../types';

export default class ErrorButton extends Component<EmptyProps, ErrorState> {
  state = {
    hasError: false,
  };

  onSetError = (): void => {
    this.setState({ hasError: true });
  };

  render(): JSX.Element {
    if (this.state.hasError) {
      throw new Error('Oops! Something bad happened!');
    }

    return (
      <button
        className="error-button btn btn-danger btn-lg"
        onClick={this.onSetError}
      >
        Throw Error
      </button>
    );
  }
}
