import React, { FC } from 'react';
import { Link } from 'lib/router';
import woowahan from 'lib/woowahan-components';
import { Logo } from 'components';
import { MAIN_URL, CART_URL, SIGNIN_URL, ORDER_LIST_URL } from 'constants/urls';

import accountIcon from 'assets/icons/account.png';
import cartIcon from 'assets/icons/cart.png';
import logoutIcon from 'assets/icons/logout.png';
import loginIcon from 'assets/icons/login.png';

interface NavbarProps {
  white?: boolean;
  mobile?: boolean;
  userId: string | null | undefined;
  onLogout: () => void;
}

const Wrapper = woowahan.nav`
  background-color: ${props => (props.white ? props.theme?.colorWhite : props.theme?.colorBg)};
  border-bottom: 1px solid ${props => props.theme?.colorLineLight};
  padding: 10px 10%;
  display: flex;
  justify-content: flex-end;
  position: relative;

  button {
    background-color: transparent;
    outline: 0;
    border: 0;
  }

  .nav-link {
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
    padding: 14px 5%;

    .nav-link {
      padding: 0 8px;
    }
  }
`;

const Navbar: FC<NavbarProps> = ({ white = false, mobile = false, userId, onLogout }) => {
  return (
    <Wrapper white={white}>
      {mobile && (
        <Link to={MAIN_URL}>
          <Logo width="130px" mobile />
        </Link>
      )}
      <div>
        {userId && (
          <Link className="nav-link" to={ORDER_LIST_URL}>
            {mobile ? <img src={accountIcon} alt="user" /> : '마이페이지'}
          </Link>
        )}
        <Link className="nav-link" to={CART_URL}>
          {mobile ? <img src={cartIcon} alt="cart" /> : '장바구니'}
        </Link>
        {userId ? (
          <button type="button" className="nav-link" onClick={onLogout}>
            {mobile ? <img src={logoutIcon} alt="logout" /> : '로그아웃'}
          </button>
        ) : (
          <Link className="nav-link" to={SIGNIN_URL}>
            {mobile ? <img src={loginIcon} alt="login" /> : '로그인'}
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

export default Navbar;
