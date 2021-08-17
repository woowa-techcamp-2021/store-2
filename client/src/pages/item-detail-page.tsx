import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import SmartMenuContainer from 'containers/smart-menu-container';
import HeaderContainer from 'containers/header-container';
import { Layout, Footer } from 'components';

const MainPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <Layout>
      <HeaderContainer isMobile={isMobile} />
      <main>
        <SmartMenuContainer currentMenu="캇테고리" />
        여기는 아이템 디테일 페이지
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default MainPage;
