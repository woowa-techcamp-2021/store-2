import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  width: 100%;
`;

const Header: FC = () => {
  return (
    <Wrapper>
      <h1>Header</h1>
    </Wrapper>
  );
};

export default Header;
