import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';

import MenuHeader from 'components/common/menu-header';
import { Layout } from 'components';
import NavbarContainer from 'containers/navbar-container';
import OrderContainer from 'containers/order-container';

const OrderPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <MenuHeader title="주문서 작성" isMobile={isMobile} />
        <OrderContainer />
      </Layout>
    </>
  );
};

export default OrderPage;
