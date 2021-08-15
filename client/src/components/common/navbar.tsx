import React, { FC } from 'react';
import { Link } from 'lib/router';
import styled from 'styled-components';

const Wrapper = styled.nav`
  background-color: ${props => props.theme.colorWhite};
  border-bottom: 1px solid ${props => props.theme.colorLineLight};
  padding: 10px 10%;
  display: flex;
  justify-content: flex-end;

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
`;

const Navbar: FC = () => {
  return (
    <Wrapper>
      <Link className="nav-link" to="/login">
        로그인
      </Link>
      <Link className="nav-link" to="/user">
        마이페이지
      </Link>
      <Link className="nav-link" to="/cart">
        장바구니
      </Link>
    </Wrapper>
  );
};

export default Navbar;
