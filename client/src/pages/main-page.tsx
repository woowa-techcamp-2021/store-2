import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import SmartMenuContainer from 'containers/smart-menu-container';
import HeaderContainer from 'containers/header-container';
import ItemContainer from 'containers/item-container';
import { Layout, Footer } from 'components';
import SearchBar from 'containers/search-container';

const MainPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <Layout>
      <HeaderContainer displayMain isMobile={isMobile} />
      <main>
        <SmartMenuContainer currentMenu="캇테고리" />
        <SearchBar />
        <ItemContainer />
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default MainPage;
