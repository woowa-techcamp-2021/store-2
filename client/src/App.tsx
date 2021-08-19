import React from 'react';
import { BrowserRouter, Switch, Route } from 'lib/router';

import {
  MainPage,
  NotFoundPage,
  LoginPage,
  SignupPage,
  AuthPage,
  ItemDetailPage,
  ItemListPage,
  CategoryPage,
} from 'pages';

import { MAIN_URL, ITEM_LIST_URL, ITEM_URL, AUTH_URL, SIGNIN_URL, SIGNUP_URL } from 'constants/urls';

import Theme from './styles/theme';

const App: React.FC = () => {
  return (
    <Theme>
      <BrowserRouter>
        <Switch>
          <Route exact path={MAIN_URL} component={MainPage} />
          <Route exact path={SIGNIN_URL} component={LoginPage} />
          <Route exact path={SIGNUP_URL} component={SignupPage} />
          <Route exact path={`${ITEM_URL}/:id`} component={ItemDetailPage} />
          <Route exact path={ITEM_LIST_URL} component={ItemListPage} />
          <Route exact path="/category" component={CategoryPage} />
          <Route exact path={AUTH_URL} component={AuthPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
