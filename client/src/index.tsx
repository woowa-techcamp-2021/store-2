import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';
import { getUser } from 'store/auth';
import { getCategories } from 'store/category';
import { loadCart } from 'store/cart';
import logger from 'redux-logger';
import rootReducer, { rootSaga } from './store';
import App from './App';

const sagaMiddleware = createSagaMiddleware();

const middleware = process.env.NODE_ENV === 'development' ? [sagaMiddleware, logger] : [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

function loadUser() {
  const user = localStorage.getItem('user');
  if (!user) return;

  store.dispatch({ type: getUser.type });
}

function loadCategories() {
  store.dispatch({ type: getCategories.type });
}

function loadCarts() {
  store.dispatch({ type: loadCart.type });
}

loadUser();
loadCategories();
loadCarts();

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>,
  document.getElementById('root'),
);
