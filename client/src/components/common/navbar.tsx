import React, { FC } from 'react';
import { Link } from 'lib/router';
import styled from 'lib/woowahan-components';

import accountIcon from 'assets/icons/account.svg';
import cartIcon from 'assets/icons/cart.svg';
import logoutIcon from 'assets/icons/logout.svg';
import loginIcon from 'assets/icons/login.svg';

import { MAIN_URL, CART_URL, SIGNIN_URL, ORDER_LIST_URL } from 'constants/urls';

import { Logo } from 'components';
import { cartGenerator } from 'utils/cart-generator';

interface NavbarProps {
  displayMain: boolean;
  isMobile: boolean;
  userId: string | null | undefined;
  onLogout: () => void;
}

const Wrapper = styled.nav`
  background-color: ${props => props.theme?.colorBg};
  border-bottom: 1px solid ${props => props.theme?.colorLineLight};
  padding: 12px 10%;
  display: flex;
  justify-content: flex-end;
  position: relative;

  b {
    ${props => props.theme?.weightBold};
  }

  .nav-link-list {
    display: flex;
    align-items: center;
  }

  .nav-link {
    cursor: pointer;
    height: 12px;
    font-size: 12px;
    font-weight: ${props => props.theme?.weightMid};
    color: ${props => props.theme?.colorGreyDark};
    text-decoration: none;
    padding: 0 14px;
  }

  .nav-link:hover {
    color: ${props => props.theme?.colorGreyMid};
  }

  ${props => props.theme?.mobile} {
    background-color: ${props => props.theme?.colorWhite};
    border: none;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
    justify-content: space-between;
    align-items: center;
    padding: 14px;

    .nav-link {
      padding: 0;
      padding-left: 12px;
      height: auto;
    }

    .nav-link > img {
      width: 30px;
    }

    div:last-child {
      padding-left: 9px;
    }
  }
`;

const cartCount = (): number => {
  const cartItems = cartGenerator();
  return cartItems.length;
};

const Navbar: FC<NavbarProps> = React.memo(({ displayMain, isMobile, userId, onLogout }) => {
  return (
    <Wrapper white={displayMain}>
      {isMobile && (
        <Link to={MAIN_URL}>
          <Logo width="130px" mobile />
        </Link>
      )}
      <div className="nav-link-list">
        {userId && (
          <Link className="nav-link" to={ORDER_LIST_URL}>
            {isMobile ? <img src={accountIcon} alt="user" /> : '마이페이지'}
          </Link>
        )}
        <Link className="nav-link" to={CART_URL}>
          {isMobile ? (
            <img src={cartIcon} alt="cart" />
          ) : (
            <span>
              장바구니 <b>{cartCount()}</b>
            </span>
          )}
        </Link>
        {userId ? (
          <button type="button" className="nav-link" onClick={onLogout}>
            {isMobile ? <img src={logoutIcon} alt="logout" /> : '로그아웃'}
          </button>
        ) : (
          <Link className="nav-link" to={SIGNIN_URL}>
            {isMobile ? <img src={loginIcon} alt="login" /> : '로그인'}
          </Link>
        )}
      </div>
    </Wrapper>
  );
});

Navbar.displayName = 'navbar';

export default Navbar;
