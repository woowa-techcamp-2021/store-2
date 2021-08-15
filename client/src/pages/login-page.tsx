import React, { ReactElement } from 'react';
import styled from 'styled-components';
import LoginContainer from 'containers/login-container';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const LoginPage = (): ReactElement => {
  return (
    <Div>
      헤더
      <LoginContainer />
      푸터
    </Div>
  );
};

export default LoginPage;
