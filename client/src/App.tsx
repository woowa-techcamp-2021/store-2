import React from 'react';
import { BrowserRouter, Switch, Route } from './lib/router';
import { MainPage, UserPage, NotFoundPage, SagaCounterPage, TestPage } from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/user" component={UserPage} />
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/counter" component={SagaCounterPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
