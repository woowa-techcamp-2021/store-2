import React, { ReactElement } from 'react';
import styled from 'styled-components';
import LoginContainer from 'containers/login-container';
import Layout from 'components/common/layout';
import useWindowSize from 'hooks/use-window-size';
import HeaderContainer from 'containers/header-container';
import Footer from 'components/common/footer';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`;

const LoginPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;
  return (
    <Layout>
      <HeaderContainer displayMain isMobile={isMobile} />
      <main>
        <Div>
          <LoginContainer />
        </Div>
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default LoginPage;
