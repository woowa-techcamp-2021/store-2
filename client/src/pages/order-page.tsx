import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import { Helmet } from 'react-helmet-async';

import MenuHeader from 'components/common/menu-header';
import { Layout } from 'components';
import NavbarContainer from 'containers/navbar-container';
import OrderContainer from 'containers/order-container';
import { TITLE } from 'constants/index';

const OrderPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <Helmet>
        <title>{TITLE}주문하기</title>
      </Helmet>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <MenuHeader title="주문서 작성" isMobile={isMobile} />
        <OrderContainer />
      </Layout>
    </>
  );
};

export default OrderPage;
