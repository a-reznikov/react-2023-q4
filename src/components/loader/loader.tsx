import { Component } from 'react';

import './loader.css';
import { EmptyState, EmptyProps } from '../types';

export default class Loader extends Component<EmptyProps, EmptyState> {
  render(): JSX.Element {
    return <span className="loader"></span>;
  }
}
