import { Component } from 'react';
import { WithChildrenProps, ErrorState } from '../types';

import ErrorMessage from '../error-message';

export default class ErrorBoundry extends Component<
  WithChildrenProps,
  ErrorState
> {
  public state: ErrorState = {
    hasError: false,
  };

  componentDidCatch(): void {
    this.setState({
      hasError: true,
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
