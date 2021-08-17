import React, { ReactElement } from 'react';
import styled from 'styled-components';
import useWindowSize from 'hooks/use-window-size';
import LoginContainer from 'containers/login-container';
import HeaderContainer from 'containers/header-container';
import { Layout, Footer } from 'components';

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
      <HeaderContainer isMobile={isMobile} />
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
