import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { getUser } from 'store/auth';
import logger from 'redux-logger';
import rootReducer, { rootSaga } from './store';
import App from './App';

const sagaMiddleware = createSagaMiddleware();

let middleware;

if (process.env.NODE_ENV === 'development') {
  middleware = [sagaMiddleware, logger];
} else {
  middleware = [sagaMiddleware];
}

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;

    store.dispatch({ type: getUser.type });
  } catch (e) {
    throw new Error(e);
  }
}

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
