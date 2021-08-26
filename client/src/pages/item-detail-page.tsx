import React, { ReactElement } from 'react';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import NavbarContainer from 'containers/navbar-container';
import SmartMenuContainer from 'containers/smart-menu-container';
import ItemDetailContainer from 'containers/item-detail-container';

const ItemDetailPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <SmartMenuContainer />
        <ItemDetailContainer />
      </Layout>
    </>
  );
};

export default ItemDetailPage;
