import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Layout } from 'components';
import SignupContainer from 'containers/signup-container';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const SignupPage = (): ReactElement => {
  return (
    <Layout>
      <Div>
        <SignupContainer />
      </Div>
    </Layout>
  );
};

export default SignupPage;
