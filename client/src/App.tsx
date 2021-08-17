import React from 'react';
import { BrowserRouter, Switch, Route } from 'lib/router';
import { MainPage, NotFoundPage, LoginPage, SignupPage, ItemDetailPage } from 'pages';
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
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
