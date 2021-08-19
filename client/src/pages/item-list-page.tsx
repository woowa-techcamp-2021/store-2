import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import SmartMenuContainer from 'containers/smart-menu-container';
import HeaderContainer from 'containers/header-container';
import { Layout, Footer } from 'components';
import { useQuery } from 'lib/router';

const ItemListPage = (): ReactElement => {
  const query = useQuery();
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <Layout>
      <HeaderContainer isMobile={isMobile} />
      <main>
        <SmartMenuContainer currentCode={query.category} />
        여기는 아이템 리스트 페이지
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default ItemListPage;
