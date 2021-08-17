import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import LoginContainer from 'containers/login-container';
import HeaderContainer from 'containers/header-container';
import { Layout, Footer } from 'components';

const LoginPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <Layout>
      <HeaderContainer isMobile={isMobile} />
      <main>
        <LoginContainer />
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default LoginPage;
