import React, { ReactElement } from 'react';
import Counter from '../components/test-example/Counter';
import LoginForm from '../components/test-example/LoginForm';
import NotFound from '../components/test-example/NotFound';
import Profile from '../components/test-example/Profile';

const MainPage = (): ReactElement => {
  const onSubmit = (): null => {
    return null;
  };
  return (
    <>
      <div className="App">
        <h1>React Testing Library</h1>
        <hr />
        <LoginForm onSubmit={onSubmit} />
        <hr />
        <NotFound path="/abc" />
      </div>
      <Profile username="velopert" name="김민준" />
      <Counter />;
    </>
  );
};

export default MainPage;
