import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';
import { mainSagaWatcher } from './redux/saga';
import { rootReducer } from './redux/reducers/index';
import App from './app/app.component';

const reSaga = createSagaMiddleware();

let window_object : any;
let store : Store;

if (typeof window !== 'undefined') {
  window_object = window;
  store = createStore(rootReducer, window_object.REDUX_DATA, applyMiddleware(reSaga));
  reSaga.run(mainSagaWatcher);
  delete window_object.REDUX_DATA;
}


const root = ReactDOM.createRoot(document.querySelector('.app'));
root.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
);



export type RootState = ReturnType<typeof store.getState>;
