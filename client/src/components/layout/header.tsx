import React, { FC } from 'react';
import styled from 'styled-components';

import { Logo, Navbar } from 'components';
import BrickBg from 'assets/images/brick.png';
import TentBg from 'assets/images/tent.png';

interface HeaderProps {
  displayMain: boolean;
  isMobile: boolean;
}

const Wrapper = styled.header`
  width: 100%;
`;

const Brick = styled.div`
  width: 100%;
  height: 150px;
  background-image: url(${BrickBg});
  display: flex;
  justify-content: center;

  .header-logo {
    margin-top: 60px;
  }
`;

const Tent = styled.div`
  width: 100%;
  height: 80px;
  background-image: url(${TentBg});
  background-repeat: repeat-x;

  ${props => props.theme.mobile} {
    margin-top: -15px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px 0;
`;

const Header: FC<HeaderProps> = ({ displayMain, isMobile }) => {
  const renderLogo = () => {
    if (isMobile) {
      if (displayMain) return <Tent />;
      return null;
    }
    if (displayMain) {
      return (
        <>
          <Brick>
            <Logo className="header-logo" />
          </Brick>
          <Tent />
        </>
      );
    }
    return (
      <LogoWrapper>
        <Logo className="header-logo" width="200px" />
      </LogoWrapper>
    );
  };

  return (
    <Wrapper>
      <Navbar white={displayMain} mobile={isMobile} />
      {renderLogo()}
    </Wrapper>
  );
};

export default Header;
