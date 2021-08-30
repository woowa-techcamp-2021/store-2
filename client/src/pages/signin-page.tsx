import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import NavbarContainer from 'containers/navbar-container';
import SigninContainer from 'containers/signin-container';
import { TITLE } from 'constants/index';

const SigninPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <Helmet>
        <title>{TITLE}로그인</title>
      </Helmet>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <SigninContainer />
      </Layout>
    </>
  );
};

export default SigninPage;
