import React from 'react';
import { BrowserRouter, Switch, Route } from 'lib/router';

import { MainPage, NotFoundPage, LoginPage, SignupPage, AuthPage, ItemDetailPage, CategoryPage } from 'pages';
import Theme from './styles/theme';

const App: React.FC = () => {
  return (
    <Theme>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route path="/item/:id" component={ItemDetailPage} />
          <Route exact path="/category" component={CategoryPage} />
          <Route exact path="/auth" component={AuthPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
