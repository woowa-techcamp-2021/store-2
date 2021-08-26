import React, { ReactElement } from 'react';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import MenuHeader from 'components/common/menu-header';
import NavbarContainer from 'containers/navbar-container';
import MyAddressContainer from 'containers/my-address-container';

const MyAddressPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <MenuHeader title="마이페이지" isMobile={isMobile} />
        <MyAddressContainer />
      </Layout>
    </>
  );
};

export default MyAddressPage;
