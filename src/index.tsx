import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.component';
import {applyMiddleware, legacy_createStore as createStore, Store} from 'redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { rootReducer } from './redux/reducers/index';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
// import { mainSagaWatcher } from './redux/saga';

const reSaga = createSagaMiddleware();


const store : Store = createStore(rootReducer, applyMiddleware(reSaga));
// reSaga.run(mainSagaWatcher);

export type RootState = ReturnType<typeof store.getState>

const root = ReactDOM.createRoot(document.querySelector('.app'));
root.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
);
