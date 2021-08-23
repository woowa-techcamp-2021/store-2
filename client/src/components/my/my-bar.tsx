import { ADDRESS_URL, ORDER_LIST_URL, REVIEW_URL } from 'constants/urls';
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
  const myPageNav = [
    { link: ORDER_LIST_URL, name: '주문목록 조회' },
    { link: ADDRESS_URL, name: '배송지 관리' },
    { link: REVIEW_URL, name: '나의 후기' },
  ];
  return (
    <Wrapper>
      {myPageNav.map(({ link, name }) => (
        <Link key={name} to={link} className={link === currentPath ? 'active' : ''}>
          {name}
        </Link>
      ))}
    </Wrapper>
  );
};

export default MyBar;
