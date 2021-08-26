import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import { Layout } from 'components';
import Cart from 'components/cart';

const CartPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <Cart />
      </Layout>
    </>
  );
};

export default CartPage;
