import React from 'react';
import { BrowserRouter, Switch, Route } from './lib/router';
import { MainPage, UserPage, NotFoundPage } from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/user" component={UserPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
