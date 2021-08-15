import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.colorFooter};
`;

const Footer: FC = () => {
  return (
    <Wrapper>
      <h1>Footer</h1>
    </Wrapper>
  );
};

export default Footer;
