import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Layout from 'components/common/layout';
import SignupContainer from 'containers/signup-container';
import HeaderContainer from 'containers/header-container';
import Footer from 'components/common/footer';
import useWindowSize from 'hooks/use-window-size';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`;

const SignupPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;
  return (
    <Layout>
      <HeaderContainer displayMain isMobile={isMobile} />
      <main>
        <Div>
          <SignupContainer />
        </Div>
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default SignupPage;
