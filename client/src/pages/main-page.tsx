import Footer from 'components/common/footer';
import Layout from 'components/common/layout';
import HeaderContainer from 'containers/header-container';
import useWindowSize from 'hooks/use-window-size';
import React, { ReactElement } from 'react';

const MainPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;
  return (
    <Layout>
      <HeaderContainer displayMain isMobile={isMobile} />
      <main>여기는 메인 페이지</main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default MainPage;
