import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import useWindowSize from 'hooks/use-window-size';

import NavbarContainer from 'containers/navbar-container';
import MenuHeader from 'components/common/menu-header';
import { Layout } from 'components';
import Cart from 'components/cart';
import { TITLE } from 'constants/index';

const CartPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <Helmet>
        <title>{TITLE}장바구니</title>
      </Helmet>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <MenuHeader title="장바구니" isMobile={isMobile} />
        <Cart />
      </Layout>
    </>
  );
};

export default CartPage;
