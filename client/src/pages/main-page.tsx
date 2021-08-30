import React, { ReactElement } from 'react';
import styled from 'lib/woowahan-components';
import { Helmet } from 'react-helmet-async';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import Banner from 'components/item/main-item/banner';
import NavbarContainer from 'containers/navbar-container';
import SmartMenuContainer from 'containers/smart-menu-container';
import MainItemContainer from 'containers/main-item-container';
import SearchContainer from 'containers/search-container';

const Wrapper = styled.article`
  width: 100%;

  .header {
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;

    ${props => props.theme?.mobile} {
      flex-direction: column-reverse;
    }
  }
`;

const MainPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <Helmet>
        <title>배민문구사</title>
      </Helmet>
      <NavbarContainer displayMain isMobile={isMobile} />
      <Layout displayMain isMobile={isMobile}>
        <SmartMenuContainer />
        <Wrapper>
          <div className="header">
            <SearchContainer />
            <Banner />
          </div>
          <MainItemContainer />
        </Wrapper>
      </Layout>
    </>
  );
};

export default MainPage;
