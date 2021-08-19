import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import SmartMenuContainer from 'containers/smart-menu-container';
import HeaderContainer from 'containers/header-container';
import MainItemContainer from 'containers/main-item-container';
import { Layout, Footer } from 'components';
import SearchContainer from 'containers/search-container';

const MainPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <Layout>
      <HeaderContainer displayMain isMobile={isMobile} />
      <main>
        <SmartMenuContainer />
        <SearchContainer />
        <MainItemContainer />
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default MainPage;
