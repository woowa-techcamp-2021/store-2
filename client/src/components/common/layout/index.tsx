import React, { FC } from 'react';
import styled from 'lib/woowahan-components';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  displayMain?: boolean;
  isMobile: boolean;
}

const Wrapper = styled.div`
  min-height: 100%;
  background-color: ${props => props.theme?.colorBg};
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    padding: 0 10%;
    display: flex;
    flex-direction: column;
  }

  ${props => props.theme?.mobile} {
    main {
      padding: 0 12px;
    }
  }

  ${props => props.theme?.laptop} {
    align-items: center;
    main {
      padding: 0;
      width: 1000px;
    }
  }
`;

const Layout: FC<LayoutProps> = ({ children, displayMain = false, isMobile }) => {
  return (
    <Wrapper>
      <Header displayMain={displayMain} isMobile={isMobile} />
      <main>{children}</main>
      <Footer isMobile={isMobile} />
    </Wrapper>
  );
};

export default Layout;
