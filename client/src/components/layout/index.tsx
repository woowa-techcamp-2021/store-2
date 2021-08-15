import React, { FC } from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';

const Wrapper = styled.div`
  position: relative;
  min-height: 100%;
  background-color: ${props => props.theme.colorBg};
`;

const Layout: FC = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  );
};

export default Layout;