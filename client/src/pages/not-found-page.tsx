import React, { ReactElement } from 'react';
import woowahan from 'lib/woowahan-components';
import useWindowSize from 'hooks/use-window-size';
import HeaderContainer from 'containers/header-container';
import { Layout, Footer } from 'components';

const Text = woowahan.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  span {
    font-family: ${props => props.theme?.fontEuljiro10};
    color: ${props => props.theme?.colorTextBeige};
  }

  span:nth-child(1) {
    font-size: 130px;
  }

  span:nth-child(2) {
    font-size: 80px;
  }

  ${props => props.theme?.mobile} {
    span:nth-child(1) {
      font-size: 100px;
    }

    span:nth-child(2) {
      font-size: 50px;
    }
  }
`;

const NotFoundPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <Layout>
      <HeaderContainer isMobile={isMobile} />
      <main>
        <Text>
          <span>404</span>
          <span>낫 파운드</span>
        </Text>
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default NotFoundPage;
