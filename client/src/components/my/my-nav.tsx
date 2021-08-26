import React, { FC } from 'react';
import styled from 'lib/woowahan-components';
import { Link, useHistory } from 'lib/router';

import { MY_PAGE_NAV } from 'constants/index';

const Wrapper = styled.nav`
  margin-top: 30px;
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

const MyNav: FC = () => {
  const { currentPath } = useHistory();

  return (
    <Wrapper>
      {MY_PAGE_NAV.map(({ link, name }) => (
        <Link key={name} to={link} className={link === currentPath ? 'active' : ''}>
          {name}
        </Link>
      ))}
    </Wrapper>
  );
};

export default MyNav;
