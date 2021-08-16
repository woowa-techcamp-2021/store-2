import Footer from 'components/common/footer';
import Layout from 'components/common/layout';
import HeaderContainer from 'containers/header-container';
import useWindowSize from 'hooks/use-window-size';
import React, { ReactElement } from 'react';
import SmartMenuContainer from 'containers/smart-menu-container';

const MainPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;
  return (
    <Layout>
      <HeaderContainer displayMain isMobile={isMobile} />
      <main>
        <SmartMenuContainer currentMenu="캇테고리" />
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default MainPage;
