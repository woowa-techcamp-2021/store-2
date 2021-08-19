import React, { ReactElement } from 'react';
import { useQuery } from 'lib/router';
import useWindowSize from 'hooks/use-window-size';
import SmartMenuContainer from 'containers/smart-menu-container';
import NavbarContainer from 'containers/navbar-container';
import { Layout } from 'components';
import { useQuery } from 'lib/router';
import SearchContainer from 'containers/search-container';
import ItemListContainer from 'containers/item-list-container';

const ItemListPage = (): ReactElement => {
  const query = useQuery();
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <SmartMenuContainer currentCode={query.categoryId} />
        <SearchContainer />
        <ItemListContainer />
      </Layout>
    </>
  );
};

export default ItemListPage;
