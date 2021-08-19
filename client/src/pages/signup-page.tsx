import React, { ReactElement } from 'react';
import styled from 'lib/woowahan-components';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import SignupContainer from 'containers/signup-container';
import { Layout } from 'components';

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
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <Div>
          <SignupContainer />
        </Div>
      </Layout>
    </>
  );
};

export default SignupPage;
