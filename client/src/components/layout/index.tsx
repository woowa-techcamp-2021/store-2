import React, { FC } from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';

const Wrapper = styled.div`
  min-height: 100%;
  background-color: ${props => props.theme.colorBg};
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    padding: 0 10%;
    background-color: ${props => props.theme.colorPointBeige};
  }
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
