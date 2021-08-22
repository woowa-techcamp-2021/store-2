import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import { Layout } from 'components';
import MyOrderListContainer from 'containers/my-order-list-container';
import MenuHeader from 'components/common/menu-header';

const MyOrderListPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <MenuHeader title="마이페이지" isMobile={isMobile} />
        <MyOrderListContainer />
      </Layout>
    </>
  );
};

export default MyOrderListPage;
