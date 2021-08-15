import React, { FC } from 'react';
import styled from 'styled-components';

import LogoImg from 'assets/images/logo.png';
import LogoTentImg from 'assets/images/logo_tent.png';
import LogoMobile from 'assets/icons/logo_mobile.png';

interface LogoProps {
  className?: string;
  width?: string;
  full?: boolean;
  mobile?: boolean;
  goMain?: boolean;
}

interface WrapperStyleProps {
  canClick: boolean;
}

const Wrapper = styled.div<WrapperStyleProps>`
  width: fit-content;
  cursor: ${props => (props.canClick ? 'pointer' : 'default')};
`;

const Logo: FC<LogoProps> = ({ className = '', width = '350px', full = false, mobile = false, goMain = true }) => {
  const getLogoSrc = (): string => {
    if (mobile) return LogoMobile;
    if (full) return LogoTentImg;
    return LogoImg;
  };

  const onClickHandler = () => {
    if (!goMain) return;
    window.location.href = '/';
  };

  return (
    <Wrapper className={className} onClick={onClickHandler} canClick={goMain}>
      <img src={getLogoSrc()} alt="logo" width={width} />
    </Wrapper>
  );
};

export default Logo;
