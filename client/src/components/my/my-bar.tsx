import { Link, useHistory } from 'lib/router';
import styled from 'lib/woowahan-components';
import React, { FC } from 'react';

const Wrapper = styled.nav`
  margin-top: 20px;
  margin-bottom: 10px;
  a {
    font-size: 18px;
    margin-right: 18px;
    font-weight: bold;
    color: #797979;
    &.active {
      color: #3e3d3c;
    }
  }

  ${props => props.theme?.mobile} {
    margin: 0 -12px;
    padding: 16px;
    border: 1px solid #ededed;
    a {
      font-size: 16px;
      margin-right: 16px;
    }
  }
`;

const MyBar: FC = () => {
  const { currentPath } = useHistory();
  const list = ['/my/order', '/my/address', '/my/review'];
  const nav = ['주문목록 조회', '배송지 관리', '나의 후기'];
  return (
    <Wrapper>
      {list.map((li, i) => (
        <Link key={li} to="/my/address" className={li === currentPath ? 'active' : ''}>
          {nav[i]}
        </Link>
      ))}
    </Wrapper>
  );
};

export default MyBar;
