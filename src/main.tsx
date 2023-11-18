// import React from 'react'; //TODO add strict mode
import ReactDOM from 'react-dom/client';
import App from './components/app';

import './bootstrap.min.css';
import ErrorBoundry from './components/error-boundry';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundry>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ErrorBoundry>
);
