import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import MenuHeader from 'components/common/menu-header';
import NavbarContainer from 'containers/navbar-container';
import MyAddressContainer from 'containers/my-address-container';
import { TITLE } from 'constants/index';

const MyAddressPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <Helmet>
        <title>{TITLE}마이페이지</title>
      </Helmet>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <MenuHeader title="마이페이지" isMobile={isMobile} />
        <MyAddressContainer />
      </Layout>
    </>
  );
};

export default MyAddressPage;
