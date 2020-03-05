import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import MoviesService from './services/movies-service';
import { MoviesServiceProvider } from './components/movies-service-context';

import store from './store';

const moviesService = new MoviesService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <MoviesServiceProvider value={moviesService}>
        <Router>
          <App />
        </Router>
      </MoviesServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);