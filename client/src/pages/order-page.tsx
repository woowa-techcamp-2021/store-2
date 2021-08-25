import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import { Layout } from 'components';
import OrderContainer from 'containers/order-continaer';

const OrderPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <OrderContainer />
      </Layout>
    </>
  );
};

export default OrderPage;
