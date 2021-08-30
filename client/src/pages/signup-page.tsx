import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import NavbarContainer from 'containers/navbar-container';
import SignupContainer from 'containers/signup-container';
import { TITLE } from 'constants/index';

const SignupPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <Helmet>
        <title>{TITLE}회원가입</title>
      </Helmet>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <SignupContainer />
      </Layout>
    </>
  );
};

export default SignupPage;
