import React, { ReactElement } from 'react';
import styled from 'lib/woowahan-components';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import SmartMenuContainer from 'containers/smart-menu-container';
import MainItemContainer from 'containers/main-item-container';
import SearchBar from 'containers/search-container';
import { Layout, Banner } from 'components';

const Wrapper = styled.article`
  width: 100%;

  .header {
    display: flex;
    flex-direction: column;

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
