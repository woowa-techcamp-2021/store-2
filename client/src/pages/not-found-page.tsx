import React, { ReactElement } from 'react';
import styled from 'lib/woowahan-components';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import NavbarContainer from 'containers/navbar-container';

const Text = styled.div`
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
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <Text>
          <span>404</span>
          <span>낫 파운드</span>
        </Text>
      </Layout>
    </>
  );
};

export default NotFoundPage;
