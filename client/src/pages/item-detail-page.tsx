import React, { ReactElement } from 'react';
import styled from 'lib/woowahan-components';

import useWindowSize from 'hooks/use-window-size';

import { Layout } from 'components';
import NavbarContainer from 'containers/navbar-container';
import SmartMenuContainer from 'containers/smart-menu-container';
import ItemDetailContainer from 'containers/item-detail-container';

const Wrapper = styled.section`
  margin-bottom: 30px;
`;

const ItemDetailPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <Wrapper>
          <SmartMenuContainer />
          <ItemDetailContainer />
        </Wrapper>
      </Layout>
    </>
  );
};

export default ItemDetailPage;
