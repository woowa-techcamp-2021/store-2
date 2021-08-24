import React, { ReactElement } from 'react';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import NavbarContainer from 'containers/navbar-container';
import SignupContainer from 'containers/signup-container';

const SignupPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <SignupContainer />
      </Layout>
    </>
  );
};

export default SignupPage;
