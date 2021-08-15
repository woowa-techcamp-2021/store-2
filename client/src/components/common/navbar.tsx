import React, { FC } from 'react';
import { Link } from 'lib/router';
import styled from 'styled-components';
import { Logo } from 'components';

import accountIcon from 'assets/icons/account.png';
import cartIcon from 'assets/icons/cart.png';
import logoutIcon from 'assets/icons/logout.png';

interface NavbarProps {
  white?: boolean;
  mobile?: boolean;
}

interface WrapperStyleProps {
  white: boolean;
}

const Wrapper = styled.nav<WrapperStyleProps>`
  background-color: ${props => (props.white ? props.theme.colorWhite : props.theme.colorBg)};
  border-bottom: 1px solid ${props => props.theme.colorLineLight};
  padding: 10px 10%;
  display: flex;
  justify-content: flex-end;
  position: relative;

  .nav-link {
    font-size: 12px;
    font-weight: ${props => props.theme.weightMid};
    color: ${props => props.theme.colorGreyDark};
    text-decoration: none;
    padding: 0 14px;
  }

  .nav-link:hover {
    color: ${props => props.theme.colorGreyMid};
  }

  ${props => props.theme.mobile} {
    background-color: ${props => props.theme.colorWhite};
    border: none;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
    justify-content: space-between;
    align-items: center;
    padding: 14px 5%;

    .nav-link {
      padding: 0 8px;
    }
  }
`;

const Navbar: FC<NavbarProps> = ({ white = false, mobile = false }) => {
  return (
    <Wrapper white={white}>
      {mobile && <Logo width="130px" mobile />}
      <div>
        <Link className="nav-link" to="/user">
          {mobile ? <img src={accountIcon} alt="user" /> : '마이페이지'}
        </Link>
        <Link className="nav-link" to="/cart">
          {mobile ? <img src={cartIcon} alt="cart" /> : '장바구니'}
        </Link>
        <Link className="nav-link" to="/logout">
          {mobile ? <img src={logoutIcon} alt="logout" /> : '로그아웃'}
        </Link>
      </div>
    </Wrapper>
  );
};

export default Navbar;
