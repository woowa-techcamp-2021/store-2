import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import SmartMenuContainer from 'containers/smart-menu-container';
import ItemDetail from 'containers/item-detail-container';
import { Layout } from 'components';

const ItemDetailPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <SmartMenuContainer />
        <ItemDetail />
      </Layout>
    </>
  );
};

export default ItemDetailPage;
