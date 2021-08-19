import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import LoginContainer from 'containers/login-container';
import { Layout } from 'components';

const LoginPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <LoginContainer />
      </Layout>
    </>
  );
};

export default LoginPage;
