import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { App } from './view';

const store = configureStore();

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);