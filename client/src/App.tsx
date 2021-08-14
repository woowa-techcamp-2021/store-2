import React from 'react';
import { BrowserRouter, Switch, Route } from 'lib/router';
import { MainPage, UserPage, NotFoundPage, SagaCounterPage, TestPage } from 'pages';
import Theme from './styles/theme';

const App: React.FC = () => {
  return (
    <Theme>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/test" component={TestPage} />
          <Route exact path="/counter" component={SagaCounterPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
