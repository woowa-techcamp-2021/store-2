import React from 'react';
import { BrowserRouter, Switch, Route } from 'lib/router';
import { MainPage, NotFoundPage, SagaCounterPage, TestPage, LoginPage, SignupPage } from 'pages';
import Theme from './styles/theme';

const App: React.FC = () => {
  return (
    <Theme>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/test" component={TestPage} />
          <Route exact path="/counter" component={SagaCounterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
