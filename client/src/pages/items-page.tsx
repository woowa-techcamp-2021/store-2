import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import SmartMenuContainer from 'containers/smart-menu-container';
import HeaderContainer from 'containers/header-container';
import { Layout, Footer } from 'components';
import ItemsContainer from 'containers/items-container';

const ItemsPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <Layout>
      <HeaderContainer isMobile={isMobile} />
      <main>
        <SmartMenuContainer />
        <ItemsContainer />
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default ItemsPage;
