import React, { ReactElement } from 'react';
import { Layout } from 'components';
import SmartMenuContainer from 'containers/smart-menu-container';

const MainPage = (): ReactElement => {
  return (
    <Layout displayMain>
      <SmartMenuContainer currentMenu="캇테고리" />
      여기는 메인 페이지
    </Layout>
  );
};

export default MainPage;
