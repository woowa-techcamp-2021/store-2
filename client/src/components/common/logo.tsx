import React, { FC } from 'react';
import LogoImg from 'assets/images/logo.png';
import styled from 'styled-components';

interface LogoProps {
  className?: string;
  width?: string;
}

const Wrapper = styled.div`
  width: fit-content;
`;

const Logo: FC<LogoProps> = ({ className = '', width = '350px' }) => {
  return (
    <Wrapper className={className}>
      <img src={LogoImg as string} alt="logo" width={width} />
    </Wrapper>
  );
};

export default Logo;
