import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100%;
  background-color: ${props => props.theme.colorBg};
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    padding: 0 10%;
    display: flex;
    justify-content: center;
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

const Layout: FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
