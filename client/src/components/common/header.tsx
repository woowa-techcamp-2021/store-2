import React, { FC } from 'react';
import woowahan from 'lib/woowahan-components';
import { Link } from 'lib/router';
import { Logo, Navbar } from 'components';
import BrickBg from 'assets/images/brick.png';
import TentBg from 'assets/images/tent.png';

interface HeaderProps {
  displayMain: boolean;
  isMobile: boolean;
  userId: string | null | undefined;
  onLogout: () => void;
}

const Wrapper = woowahan.header`
  width: 100%;
`;

const Brick = woowahan.div`
  width: 100%;
  height: 150px;
  background-image: url(${BrickBg});
  display: flex;
  justify-content: center;

  .header-logo {
    margin-top: 60px;
  }
`;

const Tent = woowahan.div`
  width: 100%;
  height: 80px;
  background-image: url(${TentBg});
  background-repeat: repeat-x;

  ${props => props.theme?.mobile} {
    margin-top: -15px;
  }
`;

const LogoWrapper = woowahan.div`
  display: flex;
  justify-content: center;
  padding: 25px 0;
`;

const Header: FC<HeaderProps> = ({ displayMain, isMobile, userId, onLogout }) => {
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
        <Link to="/">
          <Logo className="header-logo" width="200px" />
        </Link>
      </LogoWrapper>
    );
  };

  return (
    <Wrapper>
      <Navbar white={displayMain} mobile={isMobile} userId={userId} onLogout={onLogout} />
      {renderLogo()}
    </Wrapper>
  );
};

export default Header;
