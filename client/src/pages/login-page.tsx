import React, { ReactElement } from 'react';
import styled from 'styled-components';
import LoginContainer from 'containers/login-container';
import { Layout } from 'components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const LoginPage = (): ReactElement => {
  return (
    <Layout>
      <Div>
        <LoginContainer />
      </Div>
    </Layout>
  );
};

export default LoginPage;
