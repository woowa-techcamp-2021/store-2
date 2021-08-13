import React from 'react';
import { BrowserRouter, Switch, Route } from './lib/router';

import Theme from './styles/theme';
import { MainPage, UserPage, NotFoundPage } from './pages';

const App: React.FC = () => {
  return (
    <Theme>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/user" component={UserPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
