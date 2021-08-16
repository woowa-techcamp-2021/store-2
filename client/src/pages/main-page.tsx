import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import SmartMenuContainer from 'containers/smart-menu-container';
import HeaderContainer from 'containers/header-container';
import { Layout, Footer } from 'components';
import Item from 'components/item';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MainPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <Layout>
      <HeaderContainer displayMain isMobile={isMobile} />
      <main>
        <SmartMenuContainer currentMenu="캇테고리" />
        <Div>
          <Item
            thumbnail="https://mblogthumb-phinf.pstatic.net/MjAxODA1MDJfMTk3/MDAxNTI1MjM1MDI1MjM2.qcbRcEwFPkpyaAV_RQ41cmQzmVEZHJSM3fiwzUeNoecg.a9D8oTOx7Jl0MKyCHvd1TnsbRllFwuYV0lvOZTlUwQsg.JPEG.smartbaedal/image_800505831525234558336.jpg?type=w800"
            title="맥주짠 세트"
            price={10900}
          />
          <Item
            thumbnail="https://image.msscdn.net/images/goods_img/20191211/1249258/1249258_1_500.png"
            title="ㅋㅋ슬리퍼 블랙"
            price={21000}
          />
          <Item
            thumbnail="https://image.msscdn.net/images/goods_img/20210423/1917382/1917382_1_500.jpg"
            title="커피찌꺼기를 재활용해 만든 연필"
            price={2500}
          />
          <Item
            thumbnail="https://lh3.googleusercontent.com/proxy/yHMgO6EzrIC4g2N9gbwEntC_AZ1NBJOdyvzfWHuO9G51mjhZX_PGPJTisIKFCJGYjSnnU5VpKfNKIy4805ub6h3E8Z5MBBuZZqktnP55sE5Dwl-Ho98Yl1Gi3LI"
            title="반반휴지. 물반휴지반"
            price={1500}
          />
        </Div>
      </main>
      <Footer isMobile={isMobile} />
    </Layout>
  );
};

export default MainPage;
