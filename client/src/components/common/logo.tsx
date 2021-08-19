import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import LogoImg from 'assets/images/logo.svg';
import LogoTentImg from 'assets/images/logo_tent.svg';
import LogoMobile from 'assets/images/logo_mobile.svg';

interface LogoProps {
  className?: string;
  width?: string;
  full?: boolean;
  mobile?: boolean;
}

const Wrapper = styled.div`
  width: fit-content;
`;

const Logo: FC<LogoProps> = ({ className = '', width = '350px', full = false, mobile = false }) => {
  const getLogoSrc = (): string => {
    if (mobile) return LogoMobile;
    if (full) return LogoTentImg;
    return LogoImg;
  };

  return (
    <Wrapper className={className}>
      <img src={getLogoSrc()} alt="logo" width={width} />
    </Wrapper>
  );
};

export default Logo;
