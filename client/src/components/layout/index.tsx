import React, { FC } from 'react';
import styled from 'styled-components';
import useWindowSize from 'hooks/use-window-size';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  displayMain?: boolean;
}

const Wrapper = styled.div`
  min-height: 100%;
  background-color: ${props => props.theme.colorBg};
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    padding: 0 10%;
  }

  ${props => props.theme.mobile} {
    main {
      padding: 0 12px;
    }
  }

  ${props => props.theme.laptop} {
    align-items: center;

    main {
      padding: 0;
      width: 1000px;
    }
  }
`;

const Layout: FC<LayoutProps> = ({ children, displayMain = false }) => {
  const { width } = useWindowSize();

  return (
    <Wrapper>
      <Header displayMain={displayMain} isMobile={width <= 480} />
      <main>{children}</main>
      <Footer isMobile={width <= 480} />
    </Wrapper>
  );
};

export default Layout;
