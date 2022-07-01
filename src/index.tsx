import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { Provider} from 'react-redux';
import {legacy_createStore as createStore} from 'redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { rootReducer } from './redux/reducers/index';

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.querySelector('.app'));
root.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
);
