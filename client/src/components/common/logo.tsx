import React, { FC } from 'react';
import styled from 'styled-components';

import LogoImg from 'assets/images/logo.png';
import LogoTentImg from 'assets/images/logo_tent.png';

interface LogoProps {
  className?: string;
  width?: string;
  full?: boolean;
}

const Wrapper = styled.div`
  width: fit-content;
`;

const Logo: FC<LogoProps> = ({ className = '', width = '350px', full = false }) => {
  const LogoSrc: string = full ? (LogoTentImg as string) : (LogoImg as string);
  return (
    <Wrapper className={className}>
      <img src={LogoSrc} alt="logo" width={width} />
    </Wrapper>
  );
};

export default Logo;
