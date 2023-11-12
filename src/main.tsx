import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';

import './bootstrap.min.css';
import ErrorBoundry from './components/error-boundry';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundry>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundry>
  </React.StrictMode>
);
