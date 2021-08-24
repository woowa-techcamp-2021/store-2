import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import SigninContainer from 'containers/signin-container';
import { Layout } from 'components';

const SigninPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <SigninContainer />
      </Layout>
    </>
  );
};

export default SigninPage;
