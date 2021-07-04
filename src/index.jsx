import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '@fontsource/source-sans-pro';
import configureStore from './store/configureStore';
import App from './App';
import './App.css';

const store = configureStore();

const renderApp = () => render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', renderApp);
}

renderApp();
