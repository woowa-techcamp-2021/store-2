import React, { ReactElement } from 'react';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import NavbarContainer from 'containers/navbar-container';
import SigninContainer from 'containers/signin-container';

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
