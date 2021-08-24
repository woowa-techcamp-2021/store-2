import React, { ReactElement } from 'react';
import styled from 'lib/woowahan-components';
import { useQuery } from 'lib/router';
import useWindowSize from 'hooks/use-window-size';
import SmartMenuContainer from 'containers/smart-menu-container';
import NavbarContainer from 'containers/navbar-container';
import SearchContainer from 'containers/search-container';
import SearchItemContainer from 'containers/search-item-container';
import { Layout } from 'components';

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ItemListPage = (): ReactElement => {
  const query = useQuery();
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <SmartMenuContainer currentCode={query.categoryId} />
        <Wrapper>
          <SearchContainer />
          <SearchItemContainer />
        </Wrapper>
      </Layout>
    </>
  );
};

export default ItemListPage;
