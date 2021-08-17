import React, { ReactElement } from 'react';
import woowahan from 'lib/woowahan-components';
import useWindowSize from 'hooks/use-window-size';
import SignupContainer from 'containers/signup-container';
import HeaderContainer from 'containers/header-container';
import { Layout, Footer } from 'components';

const Div = woowahan.div`
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
      <HeaderContainer isMobile={isMobile} />
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
