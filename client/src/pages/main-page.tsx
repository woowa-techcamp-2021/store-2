import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import SmartMenuContainer from 'containers/smart-menu-container';
import MainItemContainer from 'containers/main-item-container';
import { Layout } from 'components';
import SearchContainer from 'containers/search-container';

const MainPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer displayMain isMobile={isMobile} />
      <Layout displayMain isMobile={isMobile}>
        <SmartMenuContainer />
        <SearchContainer />
        <MainItemContainer />
      </Layout>
    </>
  );
};

export default MainPage;
