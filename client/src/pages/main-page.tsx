import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'lib/router';

const Div = styled.div`
  padding: 12px;
  background-color: #a1e0ff;
  color: ${props => props.theme.colorBlack};
  font-family: ${props => props.theme.fontEuljiro};
  font-size: ${props => props.theme.size30};
`;

const MainPage = (): ReactElement => {
  return (
    <Div>
      This is MainPage
      <Link to="/user">유저</Link>
      <Link to="/test">테스트</Link>
      <Link to="/counter">사가 카운터</Link>
    </Div>
  );
};

export default MainPage;
