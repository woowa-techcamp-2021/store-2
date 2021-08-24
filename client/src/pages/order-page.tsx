import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import { Layout } from 'components';
import Order from 'components/order';

const OrderPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer displayMain isMobile={isMobile} />
      <Layout displayMain isMobile={isMobile}>
        <Order />
      </Layout>
    </>
  );
};

export default OrderPage;
