import { Component } from 'react';
import { StateContext } from '../contexts';

import './main.css';
import ItemList from '../item-list';
import { EmptyState, EmptyProps } from '../types';

export default class Main extends Component<EmptyProps, EmptyState> {
  render(): JSX.Element {
    return (
      <div className="main container-fluid">
        <h2 className="text-center mb-3">Characters</h2>
        <StateContext.Consumer>
          {(state) => {
            return <ItemList mainState={state} />;
          }}
        </StateContext.Consumer>
      </div>
    );
  }
}
