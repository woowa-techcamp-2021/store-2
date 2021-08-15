import React, { FC } from 'react';
import styled from 'styled-components';

import BrickBg from 'assets/images/brick.png';
import TentBg from 'assets/images/tent.png';
import Logo from './logo';

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
`;

const Header: FC = () => {
  return (
    <Wrapper>
      <Brick>
        <Logo className="header-logo" />
      </Brick>
      <Tent />
    </Wrapper>
  );
};

export default Header;
